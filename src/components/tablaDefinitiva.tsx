import React, { useState } from "react";
import {
    Button,
    Text,
    Stack,
    Flex,
    Icon,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Input,
    Link,
    Box,
    Wrap,
    WrapItem,
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
} from "@chakra-ui/react";
import {
    FiChevronDown,
    FiSearch,
    FiPieChart,
    FiPlus,
    FiEdit,
    FiCalendar,
    FiTrash,
    FiChevronUp,
    FiRotateCw,
} from "react-icons/fi";
import NextLink from 'next/link'
import { Select } from "chakra-react-select";
const TableDefinitiva = ({
    title,
    list,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchValue, setSearchValue] = useState(""); // Estado para el valor de búsqueda
    const [searchCosto, setSearchCosto] = useState(""); // Estado para el valor de búsqueda
    const nombresUnicos = new Set(list?.map((categoria) => categoria?.apellido));
    const [dependenciaFilter, setDependenciaFilter] = useState(""); // Nuevo estado
    const [sortColumn, setSortColumn] = useState("nombre"); // Current sort column
    const [sortDirection, setSortDirection] = useState("asc"); // Sort direction: "asc" or "desc"
    const [selectedRow, setSelectedRow] = useState(null);
    const toast = useToast();
    const { isOpen: isAlertDialogOpen, onOpen: onOpenAlertDialog, onClose: onCloseAlertDialog } = useDisclosure();
    const categoriasUnicas = Array.from(nombresUnicos).map(nombre => ({
        label: nombre,
        value: nombre,
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply filtering to the list
    const filteredList = list.filter((item) =>
        item?.nombre?.includes(searchValue) &&
        item?.apellido?.includes(searchCosto) &&
        (dependenciaFilter === "" || item.apellido === dependenciaFilter)
    );

    // Sort the filtered list
    const sortedItems = filteredList.slice().sort((a, b) => {
        if (sortColumn === "nombre") {
            return a.nombre.localeCompare(b.nombre) * (sortDirection === "asc" ? 1 : -1);
        } else if (sortColumn === "apellido") {
            return a.apellido.localeCompare(b.apellido) * (sortDirection === "asc" ? 1 : -1);
        }
        // Add more columns for sorting if needed
        return 0;
    });

    // Get the current items to display
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

    const handleColumnSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    return (
        <><Stack
            direction={["column", "row"]}
            w="100%"
            justifyContent={"space-between"}
            alignItems="center"
            px="0"
        >
            <AlertDialog isOpen={isAlertDialogOpen} onClose={onCloseAlertDialog}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirmación de eliminación
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            ¿Estás seguro de que deseas eliminar esta fila?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={onCloseAlertDialog}>
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={() => {
                                    // Realiza la eliminación de la fila seleccionada aquí
                                    // Asegúrate de actualizar tu fuente de datos o estado en consecuencia.
                                    onCloseAlertDialog();
                                }}
                                ml={3}
                            >
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Box>
                <Wrap spacing={1}>
                    <WrapItem>
                        <Button
                            bg="#4283D3"
                            color="white"
                        >
                            <Icon as={FiPlus} />
                        </Button>
                    </WrapItem>

                    <WrapItem>
                        <Button
                            bg="#4283D3"
                            color="white"
                        >
                            <Icon as={FiEdit} />
                        </Button>
                    </WrapItem>
                    <WrapItem>
                        <Button bg="#4283D3" color="white">
                            <Icon as={FiSearch} />
                        </Button>
                    </WrapItem>
                    <WrapItem>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                if (selectedRow !== null) {
                                    onOpenAlertDialog();
                                }
                            }}
                        >
                            <Icon as={FiTrash} />
                        </Button>
                    </WrapItem>
                </Wrap>
            </Box>
            <Box>
                <Text fontSize="xl" color={"blackAlpha.800"} fontWeight="bold">
                    {title}
                </Text>
            </Box>
            <Box>
                <Wrap spacing={1} align="center">
                    {/* <Input placeholder='Buscar...' width="auto"/> */}
                    <WrapItem>
                        <Text fontSize="sm" color={"blackAlpha.800"} fontWeight="bold">{indexOfFirstItem} de {list.length}</Text>
                        <Text ml={1} fontSize="sm" color={"blackAlpha.800"}>(filtrados de 153)</Text>
                    </WrapItem>
                    <WrapItem>
                        <Button
                            bg="#4283D3"
                            color="white"
                            onClick={() =>
                                toast({
                                    position: "bottom-right",
                                    title: "Tabla recargada con exito.",
                                    status: "success",
                                    duration: 2000,
                                    variant: "left-accent",
                                    isClosable: true,
                                })
                            }
                        >
                            <Icon as={FiRotateCw} />
                        </Button>
                    </WrapItem>
                    <WrapItem>

                    </WrapItem>
                    <WrapItem>

                    </WrapItem>
                </Wrap>
            </Box>
        </Stack>
            <TableContainer bg={"white"} borderRadius={10} mt={4}>
                <Table colorScheme='gray' >                  <Thead bg={"#6690F4"}>
                    <Tr >

                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("nombre")}>
                            <Flex align="center">
                                <span>PL.</span>
                                <Stack ml={2} direction="column" spacing={0}>
                                    <Icon
                                        as={FiChevronUp}
                                        fontSize={17}
                                        color={sortColumn === "nombre" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                    />
                                    <Icon
                                        as={FiChevronDown}
                                        fontSize={17}
                                        color={sortColumn === "nombre" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                    />
                                </Stack>
                            </Flex>
                        </Th>
                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("horarioDestino")}><Flex align="center">
                            <span>H. DESTINO</span>
                            <Stack ml={2} direction="column" spacing={0}>
                                <Icon
                                    as={FiChevronUp}
                                    fontSize={17}
                                    color={sortColumn === "horarioDestino" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                />
                                <Icon
                                    as={FiChevronDown}
                                    fontSize={17}
                                    color={sortColumn === "horarioDestino" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                />
                            </Stack>
                        </Flex></Th>
                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("horarioServicio")}>
                            <Flex align="center">
                                <span>H. SERVICIO</span>
                                <Stack ml={2} direction="column" spacing={0}>
                                    <Icon
                                        as={FiChevronUp}
                                        fontSize={17}
                                        color={sortColumn === "horarioServicio" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                    />
                                    <Icon
                                        as={FiChevronDown}
                                        fontSize={17}
                                        color={sortColumn === "horarioServicio" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                    />
                                </Stack>
                            </Flex>
                        </Th>


                        <Th color="white" fontSize="sm" onClick={() => handleColumnSort("destino")} align="center"><Flex align="center" justify={"center"}>
                            <span>DESTINO</span>
                            <Stack ml={2} direction="column" spacing={0}>
                                <Icon
                                    as={FiChevronUp}
                                    fontSize={17}
                                    color={sortColumn === "destino" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                />
                                <Icon
                                    as={FiChevronDown}
                                    fontSize={17}
                                    color={sortColumn === "destino" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                />
                            </Stack>
                        </Flex></Th>
                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("origen")}><Flex align="center">
                            <span>ORIGEN</span>
                            <Stack ml={2} direction="column" spacing={0}>
                                <Icon
                                    as={FiChevronUp}
                                    fontSize={17}
                                    color={sortColumn === "origen" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                />
                                <Icon
                                    as={FiChevronDown}
                                    fontSize={17}
                                    color={sortColumn === "origen" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                />
                            </Stack>
                        </Flex></Th>
                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("coche")}><Flex align="center">
                            <span>Coche N°</span>
                            <Stack ml={2} direction="column" spacing={0}>
                                <Icon
                                    as={FiChevronUp}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                />
                                <Icon
                                    as={FiChevronDown}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                />
                            </Stack>
                        </Flex></Th>
                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("coche")}><Flex align="center">
                            <span>Pasajeros</span>
                            <Stack ml={2} direction="column" spacing={0}>
                                <Icon
                                    as={FiChevronUp}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                />
                                <Icon
                                    as={FiChevronDown}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                />
                            </Stack>
                        </Flex></Th>

                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("coche")}><Flex align="center">
                            <span>Emp.</span>
                            <Stack ml={2} direction="column" spacing={0}>
                                <Icon
                                    as={FiChevronUp}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                />
                                <Icon
                                    as={FiChevronDown}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                />
                            </Stack>
                        </Flex></Th>
                        <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("coche")}><Flex align="center">
                            <span>Chofer</span>
                            <Stack ml={2} direction="column" spacing={0}>
                                <Icon
                                    as={FiChevronUp}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                />
                                <Icon
                                    as={FiChevronDown}
                                    fontSize={17}
                                    color={sortColumn === "coche" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                />
                            </Stack>
                        </Flex></Th>
                    </Tr>
                </Thead>

                    {/*  <Thead bg={"gray.100"}>
                        <Tr>
                            <Th color="#6690F4"><Input type="text" value={searchValue} bg={"white"} color={"black"}
                                onChange={(e) => setSearchValue(e.target.value)} /></Th>
                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>
                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>
                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>

                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>

                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>

                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>
                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>
                            <Th color="#6690F4"><Input type="number" bg={"white"} color={"black"} /></Th>

                        </Tr>
                    </Thead> */}
                    <Tbody>
                        {currentItems.map((item, index) => (
                            <Tr key={index} onClick={() => setSelectedRow(index)}
                                style={{
                                    backgroundColor: selectedRow === index ? "lightgray" : "transparent",
                                    cursor: "pointer",
                                }}>

                                <Td fontWeight={300}>{item.plataforma}</Td>
                                <Td fontWeight={300}>{item.horario_dest}</Td>
                                <Td fontWeight={300}>{item.horario_servicio}</Td>
                                <Td fontWeight={300}>{item.destino}</Td>
                                <Td fontWeight={300}>{item.origen}</Td>
                                <Td fontWeight={300}>{item.coche_nro}</Td>

                                <Td fontWeight={300}>{item.pasajeros}</Td>
                                <Td fontWeight={300}>{item.empresa.nombre}</Td>
                                <Td fontWeight={300}>{item.chofer.apellido + ' ' + item.chofer.nombre}</Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer > <Flex justifyContent="flex-end" mt={4} mr={10}>
                <Stack direction="row" spacing={4}>
                    {Array.from({ length: Math.ceil(filteredList.length / itemsPerPage) }).map((_, index) => (
                        <Button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Stack>
            </Flex></>
    );
};
export default TableDefinitiva;