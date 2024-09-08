import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from "@auth0/nextjs-auth0/edge";

import { jwtDecode } from "jwt-decode";

export default withMiddlewareAuthRequired(async (req) => {
  const res = NextResponse.next();

  const user = await getSession(req, res);

  if (!user) {
    return NextResponse.redirect("/api/auth/login");
  }

  console.log("user access token:", user.accessToken);
  console.log("permission:", jwtDecode(user.accessToken).permissions);
  console.log("scope:", jwtDecode(user.accessToken).scope);

  return res;
});

export const config = {
  matcher: "/profile",
};