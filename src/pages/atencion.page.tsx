import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  HStack,
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
} from "@chakra-ui/react";
import CardDashboard from "@component/components/CardDashboard";
import {
  GruposIcon,
  HacinamientoIcon,
  IntervencionesIcon,
  MaterialesIcon,
  PersonasIcon,
  PrestacionesIcon,
  ServiciosIcon,
  TenenciaIcon,
} from "@component/components/Icons";
import CardTable from "@component/components/CardTable";
import dynamic from "next/dynamic";
import CardTableSimple from "@component/components/CardTableSimple";
import CardFormBeneficiario from "@component/components/CardFormBeneficiario";
import CardBeneficiarioData from "@component/components/CardBeneficiarioData";
import CardGroupFamily from "@component/components/CardGroupFamily";
import CardTypesBeneficiario from "@component/components/CardTypesBeneficiario";
import { FiHome } from "react-icons/fi";
import { LoadSpinner } from "@component/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { checkBeneficiario } from "@component/store/consultaSlice";
import { AppDispatch } from "@component/store";
import Header from "@component/components/Header";

const CardChart = dynamic(
  () => {
    return import("@component/components/CardChart");
  },
  { ssr: false }
);
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();

  const { loading, error: hasError } = useSelector(
    (resp: any) => resp.consulta
  );

  return (
    <>
      <Header>
        <Head>
          <title>Terminal de Omnibus | MBB</title>
          <meta name="description" content="Terminal de Omnibus | MBB" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Button colorScheme="blue" mb={4} p={5} >
            Agregar atencion +
          </Button>
          <CardTableSimple
            title="Atención Médica"
            type="Tipo de Atencion"
            list={[
              { name: "Consulta", count: 23 },
              { name: "Laboratorio", count: 19 },
              { name: "Analisis de Sangre", count: 14 },
              { name: "Odontologia", count: 7 },
              { name: "Ginecologia", count: 3 },
              { name: "Traumatologia", count: 4 },
            ]}
          />
        </Container></Header>
    </>
  );
}
