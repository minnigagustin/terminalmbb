import { useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Collapse,
  FormControl,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Divider,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AyudasIcon } from "../../components/Icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthStore } from "@component/stores/auth";
import Head from "next/head";
import { AxiosLogout } from "@component/configs/AxiosConfig";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [descriptionError, setDescriptionError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setError(false);
    setLoading(true);
    try {
      const data = await AxiosLogout
        .post(`usuarios/login/`, {
          email: username,
          password: password,
        })
        .then((response) => response.data);

      login(data);
      console.log(data);
      router.push("/");
    } catch (e) {
      setDescriptionError("Ha ocurrido un error en la solicitud.");
      setError(true);
      onOpen()
      setPassword("");
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Terminal de Omnibus | MBB</title>
        <meta name="description" content="Terminal de Omnibus | MBB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>


        <Image flex={1} objectFit="cover" bg={"muni.celeste"} display={{ base: 'none', md: 'flex' }} align={"center"} src="https://hablemosdeargentina.com/wp-content/uploads/2018/03/Bah%C3%ADa-Blanca-4.jpg" />

        <Flex flex={1} bg={"#f5f6fa"} justify={"center"}>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "80%", lg: "50%" }}
          >
            <Flex
              direction="column"
              w="100%"
              minH={"90vh"}
              justify={"space-between"}
              p="20px"
              mt={{ md: "0px", lg: "0px" }}
            >
              <Box>
                <Box alignItems={"center"} w={"100%"}>
                  <AyudasIcon w="100%" h="100%" />
                </Box>

                <Text
                  mb="30px"
                  ms="4px"
                  ml={3}
                  mt="0px"
                  color={useColorModeValue("blackAlpha.800", "white")}
                  fontWeight={400}
                  fontSize={{ base: "15px", md: "20px", lg: "22px" }}
                >
                  Ingresá al Municipio de Bahía Blanca
                </Text>
              </Box>
              <Collapse in={isOpen} animateOpacity>
                <Box
                  p="20px"
                  color="white"
                  mb="14px"
                  bg="red.500"
                  rounded="md"
                  shadow="md"
                >
                  <Text
                    fontWeight={"bold"}
                    fontSize={"14px"}
                    textAlign={"center"}
                  >
                    error: {descriptionError}
                  </Text>
                </Box>
              </Collapse>
              <FormControl>
                <Stack
                  direction={{ base: "column", md: "column", lg: "column" }}
                  justify="space-between"
                  align="center"
                  mb="20px"
                >
                  <Box width="100%">
                    <Input
                      borderRadius="8px"
                      bg={"white"}
                      type="text"
                      placeholder="Email"
                      size='lg'
                      borderColor={"blackAlpha.600"}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Return') {
                          handleSubmit(e);
                        }
                      }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Box>
                  <Box width="100%">
                    <InputGroup size="md">
                      <Input
                        borderRadius="8px"
                        bg={"white"}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        size='lg'
                        borderColor={"blackAlpha.600"}
                        value={password}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'Return') {
                            handleSubmit(e);
                          }
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Flex onClick={handleShowPassword}>
                          {showPassword ? (
                            <ViewIcon
                              w={6}
                              h={6}
                              _hover={{ cursor: "pointer" }}
                              mt="25%"
                              ml="25%"
                            />
                          ) : (
                            <ViewOffIcon
                              w={6}
                              h={6}
                              _hover={{ cursor: "pointer" }}
                              mt="25%"
                              ml="25%"
                            />
                          )}
                        </Flex>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Stack>

                <Button
                  fontSize="10px"
                  type="submit"
                  bg="muni.celeste"
                  w="100%"
                  h="45"
                  mb="20px"
                  isDisabled={!username || !password}
                  color="white"
                  _hover={{
                    bg: "muni.verde",
                  }}
                  _active={{
                    bg: "muni.verde",
                  }}
                  _disabled={{
                    bg: "gray.300",
                    color: "gray.700",
                  }}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Text fontWeight={"bold"} fontSize={"18px"}>
                      Iniciar sesión
                    </Text>
                  )}
                </Button>
                <FormControl
                  alignItems="center"
                  justifyContent="space-between"
                  alignContent={"center"}
                  textAlign={"center"}
                  alignSelf={"center"}
                  mb="32px"
                  mt="10px"
                >
                </FormControl>

                <HStack>
                  <Divider />
                </HStack>
                <Divider />
              </FormControl>
              <FormControl
                alignItems="center"
                justifyContent="space-between"
                alignContent={"center"}
                textAlign={"center"}
                alignSelf={"center"}
                mb="32px"
                mt="10px"
              >
              </FormControl>
            </Flex>
          </Flex>
        </Flex>

      </Stack >
    </>
  );
}
