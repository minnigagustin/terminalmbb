import React, { ReactNode, ReactText, useEffect, useState } from "react";
import Head from "next/head";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiUsers,
  FiSearch,
  FiPackage,
  FiPieChart,
  FiMessageCircle,
  FiAward,
  FiAperture,
  FiBookmark,
  FiBriefcase,
} from "react-icons/fi";
import { IconType } from "react-icons";
import {
  AtencionIcon,
  AyudasIcon,
  ConsultaIcon,
  GruposIcon,
  IndicadoresIcon,
  IntervencionesIcon,
  PersonasIcon,
  PrestacionesIcon,
} from "./Icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { link } from "fs";
import { useGetDashboard } from "@component/hooks/dashboard";
import { LoginCarga } from "./LoginCarga";
import { useAuthStore } from "@component/stores/auth";

interface LinkItemProps {
  name: string;
  path?: string;
  icon: any;
  disabled?: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Escritorio", path: "/", icon: IndicadoresIcon },
  { name: "Movimientos", path: "/movimientos", icon: FiAperture },
  { name: "Choferes", path: "/choferes", icon: FiUser },
  { name: "Empresas", path: "/empresas", icon: FiBriefcase },
  { name: "Servicios", path: "/servicios", icon: FiBookmark },
];

export default function Header({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const color = useColorModeValue("gray.100", "gray.900");
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);
  if (isLoading) {
    return <Spinner w="50px" h="50px" thickness="5px" />;
  }
  return (
    <>
      <Head>
        <title>Terminal de Omnibus | MBB</title>
        <meta name="description" content="Terminal de Omnibus | MBB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minH="100vh" bg={color}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 280 }} p="4">
          {children}
        </Box>
      </Box>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      w={{ base: "full", md: 280 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Icon as={AyudasIcon} w={{ base: "80%", md: "110%" }} h="100%" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.disabled ? "Muy pronto..." : link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path?: string;
}
const NavItem = ({ icon, children, path = "/", ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link href={path} passHref={true} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={router.pathname == path ? "#6690F4" : ""}
        color={router.pathname == path ? "white" : ""}
        _hover={{
          bg: router.pathname !== path ? "gray.100" : "",
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="20" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { logout, nombre, apellido } = useAuthStore();
  /*   const { dashboard, isLoading } = useGetDashboard();
   */
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <AyudasIcon display={{ base: "flex", md: "none" }} w="60%" h="100%" />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  //@ts-ignore
                  name={nombre}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {apellido} {nombre}
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
