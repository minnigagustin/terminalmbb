import axios from "axios";
import { useQuery } from "react-query";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "next/router";

export const useGetDashboard = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery(
    ["dashboard"],
    () =>
      axios
        .get(`https://autentica.bahia.gob.ar/userprofile/`, {})
        .then((res) => res.data[0]),
    {
      onError: (err) => {
        console.error(err);
        logout();
        router.push("/login");

        // Aquí puedes hacer cualquier acción que quieras realizar en caso de un error
      },
    }
  );

  return {
    dashboard: data || [],
    isLoading,
    isError,
  };
};
