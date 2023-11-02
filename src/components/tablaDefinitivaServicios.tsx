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
    Tag,
    useToast,
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
const TableDefinitivaServicios = ({
    title,
    list,
    onOpen
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchValue, setSearchValue] = useState(""); // Estado para el valor de búsqueda
    const [searchCosto, setSearchCosto] = useState(""); // Estado para el valor de búsqueda
    const nombresUnicos = new Set(list?.map((categoria) => categoria?.nombre));
    const [dependenciaFilter, setDependenciaFilter] = useState(""); // Nuevo estado
    const [sortColumn, setSortColumn] = useState("nombre"); // Current sort column
    const [sortDirection, setSortDirection] = useState("asc"); // Sort direction: "asc" or "desc"
    const toast = useToast();
    const [selectedItem, setSelectedItem] = useState(null); // Elemento seleccionado
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false); // Estado del cuadro de diálogo de eliminación


    const categoriasUnicas = Array.from(nombresUnicos).map(nombre => ({
        label: nombre,
        value: nombre,
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply filtering to the list
    const filteredList = list;

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
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

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
            <Box>
                <Wrap spacing={1}>
                    <WrapItem>
                        <Button
                            bg="#4283D3"
                            color="white"
                            onClick={onOpen}
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
                        <Button colorScheme="red" onClick={() => {
                            if (selectedItem) {
                                setIsDeleteAlertOpen(true);
                            } else {
                                // Muestra un mensaje de error o notificación si no se ha seleccionado un elemento.
                            }
                        }} >
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
                        <Text fontSize="sm" color={"blackAlpha.800"} fontWeight="bold">{indexOfFirstItem} de {filteredList.length}</Text>
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
                <Table variant='striped' colorScheme='gray' >
                    <Thead bg={"#6690F4"}>
                        <Tr>
                            <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("id")}><Flex align="center">
                                <span>ID</span>
                                <Stack ml={2} direction="column" spacing={0}>
                                    <Icon
                                        as={FiChevronUp}
                                        fontSize={17}
                                        color={sortColumn === "id" && sortDirection === "asc" ? 'white' : 'gray.600'}
                                    />
                                    <Icon
                                        as={FiChevronDown}
                                        fontSize={17}
                                        color={sortColumn === "id" && sortDirection === "desc" ? 'white' : 'gray.600'}
                                    />
                                </Stack>
                            </Flex></Th>
                            <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("nombre")}>
                                <Flex align="center">
                                    <span>NOMBRE</span>
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

                            <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("coche")} ><Flex align="center" justify={"right"}>
                                <span>ACTIVO</span>
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

                    <Tbody>
                        {currentItems.map((item, index) => (
                            <Tr key={index}>
                                <Td >
                                    <Link as={NextLink} href={`pedidodetalles/${item.NUM_PED}`} _hover={{ color: 'gray.800', textDecoration: 'underline', }} fontWeight={600}
                                        color={"muni.celeste"}>
                                        {item.id}
                                    </Link></Td>
                                <Td fontWeight={300}>{item?.nombre}</Td>
                                <Td fontWeight={300} isNumeric>{item?.activo ? <Tag size={"lg"} variant='solid' colorScheme='green'>ACTIVO</Tag> : <Tag size={"lg"} variant='solid' colorScheme='red'>DESACTIVADO</Tag>}</Td>


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
export default TableDefinitivaServicios;