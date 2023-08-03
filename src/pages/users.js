"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';
import classes from "../styles/users.module.css";
import Preloader from "../components/Preloader/Preloader";
import { UserService } from "../services/user.service";

//Here I use React for render html in client side.
//Because the page don't need for search google robot.
export default function CreateUsersList() {

    const [usersList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getUsersListfromDB = async () => {
            const Users = await UserService.getUsers();
            setLoading(false);
            setUserList(Users.reverse());
        }
        getUsersListfromDB();
    }, [])

    return <div className={classes.usersWrapper}>
        <div className={classes.usersBlock}>
            <h3>Список пользователей</h3>
            {!isLoading
                ? <div>
                    <div className={classes.usersListWrapper}>
                        {usersList.map((user) =>
                            <div key={user._id} className={classes.userWrapper}>
                                <Link href={`/users/${user._id}`}>{user.name}</Link>
                            </div>)
                        }
                    </div>
                    <Link href={{
                        pathname: "/users/userform",
                        query: { status: true }
                    }}>
                        <button className={classes.MenuButton}>Add user</button>
                    </Link>
                </div>
                : <Preloader />
            }

        </div>

    </div>
}
