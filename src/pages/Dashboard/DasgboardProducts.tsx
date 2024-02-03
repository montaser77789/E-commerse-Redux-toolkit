import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useDeleteDashboardProductsMutation,
  useGetProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../../app/Slices/features/Services/ProductApiSlice";
import { Iattributes, Iproduct } from "../../interfaces";
import TableSkeleton from "../../Components/TableSkeleton";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import AlertDialog from "../../Components/AlertDialog";
import { useEffect, useState } from "react";
import CustomModel from "../../Components/CustomModel";
interface Ithumbnail {
  url: string;
}
function DashboardProducts() {
  const [clickedProducId, setclickedProducId] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [clickedProducToEdit, setclickedProducToEdit] = useState<Iattributes>({
    id: 1,
    qty: 1,
    title: "",
    description: "",
    price: 1,
    stock: 1,
    thumbnail: {
      data: {
        id: 1,
        attributes: {
          url: "" as Ithumbnail["url"],
        },
      },
    },
  });
  const [Destoryproducts, { isLoading: isDestory, isSuccess }] =
    useDeleteDashboardProductsMutation();
  const [updateproducts, { isLoading: isUpdate, isSuccess: isSuccessupdate }] =
    useUpdateDashboardProductsMutation();

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setclickedProducToEdit({ ...clickedProducToEdit, [name]: value });
  };

  const onChaneHandlerPrice = (value: string) => {
    setclickedProducToEdit({ ...clickedProducToEdit, price: +value });
  };
  const onChaneHandlerStock = (value: string) => {
    setclickedProducToEdit({ ...clickedProducToEdit, stock: +value });
  };
  const onSubmitHandler = () => {
    console.log(clickedProducToEdit);
    console.log(thumbnail);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: clickedProducToEdit.title,
        description: clickedProducToEdit.description,
        price: clickedProducToEdit.price,
        stock: clickedProducToEdit.stock,
      })
    );
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }
    updateproducts({ id: clickedProducId, body: formData });
    console.log(formData);
  };
  const onChaneThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      setThumbnail(files[0]);
    }
  };

  const { data, isLoading } = useGetProductsQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModel,
    onOpen: onOpenModel,
    onClose: onCloseModel,
  } = useDisclosure();

  useEffect(() => {
    if (isSuccess) {
      setclickedProducId(0);
      onClose();
    }
    if (isSuccessupdate) {
      setclickedProducId(0);
      onCloseModel();
    }
  }, [isSuccess, onClose, Destoryproducts, onCloseModel, isSuccessupdate]);
  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="purple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>title</Th>
              <Th>Catagory</Th>
              <Th>descriptin</Th>
              <Th>thumbnail</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product: Iproduct) => (
              <Tr>
                <Td>{product.id}</Td>
                <Td>{product.attributes.title}</Td>
                <Td>{product.attributes.catagory.data.attributes.title}</Td>
                <Td>{product.attributes.description.slice(0, 20)}</Td>
                <Td>
                  {" "}
                  <Image
                    src={`http://localhost:1337${product.attributes.thumbnail.data.attributes.url}`}
                    alt={"alt"}
                    objectFit="cover"
                    height="50px"
                    width={"50px"}
                    rounded={"full"}
                    m={"10px 0"}
                    mr={"3"}
                  />
                </Td>
                <Td>{product.attributes.price}</Td>
                <Td>{product.attributes.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products${product.id}`}
                    mr={2}
                    colorScheme="purple"
                    variant={"solid"}
                    onClick={() => {}}
                  >
                    <AiOutlineEye size={17} />
                  </Button>
                  <Button
                    mr={2}
                    colorScheme="red"
                    variant={"solid"}
                    onClick={() => {
                      setclickedProducId(product.id);
                      onOpen();
                    }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant={"solid"}
                    onClick={() => {
                      onOpenModel();
                      setclickedProducToEdit(product.attributes);
                      setclickedProducId(product.id);
                    }}
                  >
                    <CiEdit size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isLoading={isDestory}
        Desert={() => Destoryproducts(clickedProducId)}
        title="Are you sure?"
        description="Do you really want to destory this product? this product cannot undone "
        noCancle="Cancle"
        okDelete="Destory"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      <CustomModel
        isOpen={isOpenModel}
        onClose={onCloseModel}
        closeTxt="Cancle"
        openTxt="Update"
        title="Edit product"
        onOpen={onOpenModel}
        onSubmitHandler={onSubmitHandler}
        isupdate={isUpdate}
      >
        <FormControl mt={2}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Title"
            onChange={onChangeHandler}
            value={clickedProducToEdit.title}
            name="title"
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            onChange={onChangeHandler}
            value={clickedProducToEdit.description}
            name="description"
          />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>THUMBNAIL</FormLabel>
          <Input
            type="file"
            h={"full"}
            p={2}
            accept="image/png ,image/gif,image/jpeng"
            placeholder="Last name"
            onChange={onChaneThumbnailHandler}
          />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>Peice</FormLabel>
          <NumberInput
            name="price"
            onChange={onChaneHandlerPrice}
            defaultValue={clickedProducToEdit.price}
            max={30}
            clampValueOnBlur={false}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>Stock</FormLabel>
          <NumberInput
            name="stock"
            onChange={onChaneHandlerStock}
            defaultValue={clickedProducToEdit.stock}
            max={30}
            clampValueOnBlur={false}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </CustomModel>
    </>
  );
}

export default DashboardProducts;
