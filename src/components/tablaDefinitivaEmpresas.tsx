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
} from "react-icons/fi";
import NextLink from 'next/link'
import { Select } from "chakra-react-select";
const TableDefinitivaEmpresas = ({
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
                            <Icon as={FiCalendar} />
                        </Button>
                    </WrapItem>
                    <WrapItem>
                        <Button bg="#4283D3" color="white">
                            <Icon as={FiPieChart} />
                        </Button>
                    </WrapItem>
                    <WrapItem>
                        <Button bg="#4283D3" color="white">
                            <Icon as={FiSearch} />
                        </Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme="red">
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
                            <Icon as={FiPieChart} />
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
                <Table variant="simple" >
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
                            <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("horarioDestino")}><Flex align="center">
                                <span>CUIT</span>
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
                                    <span>EMAIL</span>
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
                                <span>TELEFONO</span>
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

                            <Th color="white" fontSize={"sm"} onClick={() => handleColumnSort("coche")}><Flex align="center">
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

                    <Thead >
                        <Tr>
                            <Th color="white"><Input type="number" /></Th>
                            <Th color="#6690F4"><Input type="text" value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)} /></Th>
                            <Th color="#6690F4"><Input type="number" /></Th>
                            <Th color="#6690F4"><Input type="number" /></Th>
                            <Th color="#6690F4"><Input type="number" /></Th>



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
                                <Td fontWeight={300}>{item?.cuit}</Td>
                                <Td fontWeight={300}>{item?.email}</Td>
                                <Td fontWeight={300}>{item?.telefono}</Td>
                                <Td fontWeight={300}>{item?.activo ? <Tag size={"lg"} variant='solid' colorScheme='green'>ACTIVO</Tag> : <Tag size={"lg"} variant='solid' colorScheme='red'>DESACTIVADO</Tag>}</Td>


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
export default TableDefinitivaEmpresas;