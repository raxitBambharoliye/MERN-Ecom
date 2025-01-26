import MQ from "./mongoCommand";

const checkRole = (role:any[],userRole:any,res:any) => {
    if (!role.includes(userRole)) {
        return res.status(401).json({
            error: [{ path: "root", msg: "unauthenticated user " }],
          });
    }
}

export { MQ };
