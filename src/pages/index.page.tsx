import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  Box,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import CardDashboard from "@component/components/CardDashboard";
import {
  GruposIcon,
  IntervencionesIcon,
  PersonasIcon,
  PrestacionesIcon,
  movimientosIcon,
} from "@component/components/Icons";
import CardTable from "@component/components/CardTable";
import dynamic from "next/dynamic";
import CardTableSimple from "@component/components/CardTableSimple";
import { LoadSpinner } from "@component/components/Spinner";
import { LoginCarga } from "@component/components/LoginCarga";
import Header from "@component/components/Header";
import { useAuthStore } from "@component/stores/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetDashboard } from "@component/hooks/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import {
  estadisticasGet,
  gruposGet,
  intervencionesGet,
  personasRegistradas,
  prestacionesGet,
} from "@component/store/inicioSlice";
import { getCalles } from "@component/store/consultaSlice";
import { FiAperture, FiBookmark, FiBriefcase, FiCreditCard, FiDownload, FiFolder, FiHeart, FiMail, FiSettings, FiUser } from "react-icons/fi";

const CardChart = dynamic(
  () => {
    return import("@component/components/CardChart");
  },
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();

  const {
    movimientos, choferes, empresas, servicios
  } = useSelector((resp: any) => resp.inicio);
  useEffect(() => {
    dispatch(estadisticasGet());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9" mt={10}>

          <Box w={"100%"} textAlign={"left"} ml={5}>
            <Text fontSize={"3xl"} color={"muni.celeste"} fontWeight={600}>
              Bienvenido!</Text>
            <Text fontSize={"xl"} color={"gray"} fontWeight={400}>
              Al sistema de gestión de movimientos de la terminal de Omnibus de Bahía Blanca</Text>
          </Box>
          <Divider />
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mt={12} paddingBottom={10} paddingRight={4} paddingLeft={4}>
            {/* Box 1 */}
            <Box maxW='sm' borderRadius='lg' overflow='hidden'>
              <a href="./movimientos">
                <Box bg={"gray.50"} h={52} justifyContent={"center"} textAlign={"center"} display="flex" flexDirection="column" alignItems="center">
                  <Icon as={movimientosIcon} fontSize={90} color={"muni.celeste"} />
                  <Text fontSize={34} fontWeight={550} mt={2} color={"gray.600"}>{movimientos}</Text>
                  <Text fontSize={20} mt={-2} color={"gray.600"}>En el día de hoy</Text>
                </Box>
                <Box p='6' bg={"muni.verde"}>
                  <Box
                    fontWeight={600}
                    fontSize={23}
                    color={"white"}
                    textAlign={"center"}
                  >
                    VER MOVIMIENTOS
                  </Box>
                </Box>
              </a>
            </Box>

            {/* Box 2 */}
            <Box maxW='sm' borderRadius='lg' overflow='hidden'>
              <a href="./choferes">
                <Box bg={"gray.50"} h={52} justifyContent={"center"} textAlign={"center"} display="flex" flexDirection="column" alignItems="center">
                  <Icon as={FiUser} fontSize={90} color={"muni.celeste"} />
                  <Text fontSize={34} fontWeight={550} mt={2} color={"gray.600"}>{choferes}</Text>
                  <Text fontSize={20} mt={-2} color={"gray.600"}>Al día de hoy</Text>
                </Box>
                <Box p='6' bg={"muni.verde"}>
                  <Box
                    fontWeight={600}
                    fontSize={23}
                    color={"white"}
                    textAlign={"center"}
                  >
                    VER CHOFERES
                  </Box>
                </Box>
              </a>
            </Box>

            {/* Box 3 */}
            <Box maxW='sm' borderRadius='lg' overflow='hidden'>
              <a href="./empresas" >
                <Box bg={"gray.50"} h={52} justifyContent={"center"} textAlign={"center"} display="flex" flexDirection="column" alignItems="center">
                  <Icon as={FiBriefcase} fontSize={90} color={"muni.celeste"} />
                  <Text fontSize={34} fontWeight={550} mt={2} color={"gray.600"}>{empresas}</Text>
                  <Text fontSize={20} mt={-2} color={"gray.600"}>Al día de hoy</Text>
                </Box>
                <Box p='6' bg={"muni.verde"}>
                  <Box
                    fontWeight={600}
                    fontSize={23}
                    color={"white"}
                    textAlign={"center"}
                  >
                    VER EMPRESAS
                  </Box>
                </Box>
              </a>
            </Box>

            {/* Box 4 */}
            <Box maxW='sm' borderRadius='lg' overflow='hidden'>
              <a href="./servicios">
                <Box bg={"gray.50"} h={52} justifyContent={"center"} textAlign={"center"} display="flex" flexDirection="column" alignItems="center">
                  <Icon as={FiBookmark} fontSize={90} color={"muni.celeste"} />
                  <Text fontSize={34} fontWeight={550} mt={2} color={"gray.600"}>{servicios}</Text>
                  <Text fontSize={20} mt={-2} color={"gray.600"}>En el día de hoy</Text>
                </Box>
                <Box p='6' bg={"muni.verde"}>
                  <Box
                    fontWeight={600}
                    fontSize={23}
                    color={"white"}
                    textAlign={"center"}
                  >
                    VER SERVICIOS
                  </Box>
                </Box>
              </a>
            </Box>
          </SimpleGrid>
        </Container>
      </Header>
    </>
  );
}
