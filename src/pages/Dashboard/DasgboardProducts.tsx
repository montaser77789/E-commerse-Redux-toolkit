import {
  Box,
  Button,
  Flex,
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
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useCreateDashboardProductsMutation,
  useDeleteDashboardProductsMutation,
  useGetProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../../app/Slices/features/Services/ProductApiSlice";
import { Iattributes, Iproduct } from "../../interfaces";
import TableSkeleton from "../../Components/TableSkeleton";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import AlertDialog from "../../Components/AlertDialog";
import { useEffect, useState } from "react";
import CustomModel from "../../Components/CustomModel";
import { FaArrowLeft } from "react-icons/fa";
interface Ithumbnail {
  url: string;
}
function DashboardProducts() {
  const [clickedProducId, setclickedProducId] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [thumbnailCreate, setThumbnailCreate] = useState<File | undefined>();
  const navigate = useNavigate();
  const toNavigate = () => navigate("/");

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
  const [clickedProducToCreate, setclickedProducToCreate] =
    useState<Iattributes>({
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
  const [
    createproducts,
    { isLoading: isLoadingCreate, isSuccess: isSuccessCreate },
  ] = useCreateDashboardProductsMutation();

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setclickedProducToEdit({ ...clickedProducToEdit, [name]: value });
  };
  const onChangeHandlerCreate = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setclickedProducToCreate({ ...clickedProducToCreate, [name]: value });
  };

  const onChaneHandlerPrice = (value: string) => {
    setclickedProducToEdit({ ...clickedProducToEdit, price: +value });
  };
  const onChaneHandlerStock = (value: string) => {
    setclickedProducToEdit({ ...clickedProducToEdit, stock: +value });
  };

  const onChaneHandlerPriceCreate = (value: string) => {
    setclickedProducToCreate({ ...clickedProducToCreate, price: +value });
  };
  const onChaneHandlerStockCreate = (value: string) => {
    setclickedProducToCreate({ ...clickedProducToCreate, stock: +value });
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

  const onSubmitHandlerCreate = () => {
    console.log(clickedProducToCreate);
    console.log(thumbnailCreate);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: clickedProducToCreate.title,
        description: clickedProducToCreate.description,
        price: clickedProducToCreate.price,
        stock: clickedProducToCreate.stock,
      })
    );
    if (thumbnailCreate) {
      formData.append("files.thumbnail", thumbnailCreate);
    }
    createproducts({ body: formData });
    console.log("Create");
  };

  const onChaneThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      setThumbnail(files[0]);
    }
  };
  
  const onChaneThumbnailHandlerCreate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (files?.length) {
      setThumbnailCreate(files[0]);
    }
  };

  const { data, isLoading } = useGetProductsQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModel,
    onOpen: onOpenModel,
    onClose: onCloseModel,
  } = useDisclosure();
  const {
    isOpen: isOpenModelCreate,
    onOpen: onOpenModelCreate,
    onClose: onCloseModelCreate,
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
    if (isSuccessCreate) {
      setclickedProducToCreate({
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

      onCloseModelCreate();
    }
  }, [
    isSuccess,
    onClose,
    onCloseModel,
    isSuccessupdate,
    onCloseModelCreate,
    isSuccessCreate,
  ]);
  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <Box
        onClick={toNavigate}
        cursor={"pointer"}
        display="flex"
        alignItems="center"
      >
        <FaArrowLeft size={20} style={{ marginRight: "8px" }} />
        <Text fontSize="lg" fontWeight="bold">
          Back
        </Text>
      </Box>
      <Flex flexDirection={"column"}>
        <Button
          ml={"auto"}
          w={"fit-content"}
          colorScheme="blue"
          onClick={() => {
            onOpenModelCreate();
          }}
          isLoading={isLoadingCreate}
        >
          CreateProduct
        </Button>

        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              Dashboard Products {data?.data.length ?? 0}
            </TableCaption>
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
                  <Td>{product.attributes.title.slice(0, 10)}...</Td>
                  <Td>
                    {product.attributes.catagory.data?.attributes.title.slice(
                      0,
                      10
                    )}
                    ...
                  </Td>
                  <Td>{product.attributes.description.slice(0, 10)}...</Td>
                  <Td>
                    {" "}
                    <Image
                      src={product.attributes.thumbnail.data?.attributes.url}
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
                      mr={2}
                      colorScheme="purple"
                      variant={"solid"}
                      as={Link}
                      to={`/product/${product.id}`}
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
            <Tfoot>
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
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>

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
      {/* Update       */}
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

      {/* Create */}
      <CustomModel
        isOpen={isOpenModelCreate}
        onClose={onCloseModelCreate}
        closeTxt="Cancle"
        openTxt="Create"
        title="Create product"
        onOpen={onOpenModel}
        onSubmitHandler={onSubmitHandlerCreate}
        isupdate={isLoadingCreate}
      >
        <FormControl mt={2}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Title"
            onChange={onChangeHandlerCreate}
            value={clickedProducToCreate.title}
            name="title"
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            onChange={onChangeHandlerCreate}
            value={clickedProducToCreate.description}
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
            onChange={onChaneThumbnailHandlerCreate}
          />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>Peice</FormLabel>
          <NumberInput
            name="price"
            onChange={onChaneHandlerPriceCreate}
            defaultValue={clickedProducToCreate.price}
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
            onChange={onChaneHandlerStockCreate}
            defaultValue={clickedProducToCreate.stock}
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
