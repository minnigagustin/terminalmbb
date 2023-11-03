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
import { getEmpresas } from "@component/store/empresasSlice";
import { getChoferes } from "@component/store/choferesSlice";

const ModalMovimientosAdd = ({ product, onClose }: any) => {
    const fileInputRef = useRef(null);
    const [nombre, SetNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [documento, setDocumento] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apellido, setApellido] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [horariodestino, setHorarioDestino] = useState("");
    const [horarioservicio, setHorarioServicio] = useState("");
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [coche, setCoche] = useState("");
    const [pasajeros, setPasajeros] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [chofer, setChofer] = useState("");

    const [celular, setCelular] = useState("");
    const [tipo, setTipo] = useState("");
    const [RUC, setRUC] = useState("");
    const [DV, setDV] = useState("");
    const [API, setAPI] = useState("");

    const { zonas } = useSelector((resp: any) => resp.inicio);

    const dispatch: AppDispatch = useDispatch();

    const { choferes } = useSelector((resp: any) => resp.choferes);
    const { empresas } = useSelector((resp: any) => resp.empresas);


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
        formData.append("plataforma", plataforma); // Agrega el nombre al FormData
        formData.append("horario_dest", horariodestino); // Agrega el nombre al FormData

        formData.append("empresa_id", empresa); // Agrega el nombre al FormData
        formData.append("horario_servicio", horarioservicio); // Agrega el nombre al FormData
        formData.append("horario_arrivo_plataforma", horariodestino); // Agrega el nombre al FormData
        formData.append("origen", origen); // Agrega el nombre al FormData

        //@ts-ignore
        formData.append("activo", true); // Agrega el nombre al FormData

        AxiosLogged
            .post(
                "movimientos/",
                formData
            )
            .then((data) => {
                dispatch(getChoferes());
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
                Agregar Movimiento
            </Heading>
            <FormControl id="userName" isRequired>
                <FormLabel>Plataforma</FormLabel>
                <Input
                    placeholder="Plataforma"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(event) => setPlataforma(event.target.value)}
                />
            </FormControl>
            <HStack>
                <FormControl id="userName" isRequired>
                    <FormLabel>Horario Destino</FormLabel>
                    <Input
                        placeholder="Plataforma"
                        _placeholder={{ color: "gray.500" }}
                        type="time"
                        onChange={(event) => setHorarioDestino(event.target.value)}
                    />
                </FormControl>
                <FormControl id="userName" isRequired>
                    <FormLabel>Horario Servicio</FormLabel>
                    <Input
                        placeholder="Nombre"
                        _placeholder={{ color: "gray.500" }}
                        type="time"
                        onChange={(event) => setHorarioServicio(event.target.value)}
                    />
                </FormControl></HStack>
            <FormControl id="userName" isRequired>
                <FormLabel>Origen</FormLabel>
                <Input
                    placeholder="44082259"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(event) => setOrigen(event.target.value)}
                />
            </FormControl>
            <FormControl id="userName" isRequired>
                <FormLabel>Destino</FormLabel>
                <Input
                    placeholder="user@domain.com"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(event) => setDestino(event.target.value)}
                />
            </FormControl>
            <FormControl id="userName" isRequired>
                <FormLabel>Coche N°</FormLabel>
                <Input
                    placeholder="29140...."
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(event) => setCoche(event.target.value)}
                />
            </FormControl>
            <FormControl id="userName" isRequired>
                <FormLabel>Pasajeros</FormLabel>
                <Input
                    placeholder="29140...."
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(event) => setPasajeros(event.target.value)}
                />
            </FormControl>
            <FormControl id="userName" isRequired>
                <FormLabel>Empresa</FormLabel>
                <Select placeholder='Seleccionar Empresa' onChange={(event) => setEmpresa(event.target.value)}
                >
                    {empresas.map((empresa, key) =>
                        <option value={empresa.id} key={key}>{empresa.nombre}</option>)}
                </Select>
            </FormControl>
            <FormControl id="userName" isRequired>
                <FormLabel>Chofer</FormLabel>
                <Select placeholder='Seleccionar Chofer' onChange={(event) => setChofer(event.target.value)}
                >
                    {choferes.map((chofer, key) =>
                        <option value={chofer.id} key={key}>{chofer.apellido} {chofer.nombre}</option>)}
                </Select>
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
        </Stack >
    );
};

export default ModalMovimientosAdd;
