import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.user);

    const publicRoutes = ["/", "/auth/login", "/auth/register"];

    useEffect(() => {
      // Nếu chưa có user và đang vào private route ➔ redirect
      if (!user && !publicRoutes.includes(router.pathname)) {
        router.push("/auth/login");
      }
    }, [user, router.pathname]);

    return <>{children}</>;
}
