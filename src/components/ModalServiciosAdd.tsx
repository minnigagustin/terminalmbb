import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Switch,
    Select,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { AxiosLogged } from "@component/configs/AxiosConfig";
import { getServicios } from "@component/store/serviciosSlice";

const ModalServiciosAdd = ({ product, onClose }: any) => {
    const fileInputRef = useRef(null);
    const [nombre, SetNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cuit, setCuit] = useState("");

    const [celular, setCelular] = useState("");
    const [tipo, setTipo] = useState("");
    const [RUC, setRUC] = useState("");
    const [DV, setDV] = useState("");
    const [API, setAPI] = useState("");

    const { zonas } = useSelector((resp: any) => resp.inicio);

    const dispatch: AppDispatch = useDispatch();

    const [file, setFile] = useState(
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
    );

    const [fileimage, setFileImage] = useState(null);

    const handleButtonClick = () => {
        //@ts-ignore
        fileInputRef?.current?.click();
    };

    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0];
        // Aquí puedes realizar acciones con el archivo seleccionado
        console.log("Archivo seleccionado:", file);
        const fileUrl = URL.createObjectURL(file);
        // Asignar la URL al atributo src del Avatar
        console.log(fileUrl);
        setFile(fileUrl);
        setFileImage(file);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        //@ts-ignore
        //@ts-ignore
        formData.append("nombre", nombre); // Agrega el nombre al FormData
        //@ts-ignore
        formData.append("activo", true); // Agrega el nombre al FormData

        AxiosLogged
            .post(
                "servicios/",
                formData
            )
            .then((data) => {
                dispatch(getServicios());
                console.log(data);
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
        >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Agregar Servicio
            </Heading>

            <FormControl id="userName" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                    placeholder="Nombre del servicio"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(event) => SetNombre(event.target.value)}
                />
            </FormControl>

            <Stack spacing={6} direction={["column", "row"]}>
                <Button
                    onClick={onClose}
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                        bg: "red.500",
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    bg={"blue.400"}
                    onClick={handleSubmit}
                    color={"white"}
                    w="full"
                    _hover={{
                        bg: "blue.500",
                    }}
                >
                    Agregar
                </Button>
            </Stack>
        </Stack>
    );
};

export default ModalServiciosAdd;
