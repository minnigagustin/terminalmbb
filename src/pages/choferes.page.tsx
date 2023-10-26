import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  Box,
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
  IntervencionesIcon,
  PersonasIcon,
  PrestacionesIcon,
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
  gruposGet,
  intervencionesGet,
  prestacionesGet,
} from "@component/store/inicioSlice";
import { getCalles } from "@component/store/consultaSlice";
import TableDefinitiva from "@component/components/tablaDefinitiva";
import { getMovimientos } from "@component/store/movimientosSlice";
import { getChoferes } from "@component/store/choferesSlice";
import TableDefinitivaChoferes from "@component/components/tablaDefinitivaChoferes";

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
    choferes,
  } = useSelector((resp: any) => resp.choferes);
  useEffect(() => {
    dispatch(getChoferes());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9" mt={10}>
          <TableDefinitivaChoferes title={'CHOFERES'} list={choferes} />

        </Container>
      </Header>
    </>
  );
}
