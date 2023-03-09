import React from "react";
import { GetServerSideProps } from "next";
import Table from "react-bootstrap/Table";
import styles from "@/styles/Home.module.css";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";

interface Props {
  users: User[];
}

interface User {
  uuid: string;
  name: string;
  email: string;
  gender: string;
}

const Page = ({ users }: Props) => {
  const router = useRouter();

  const onChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    router.push(`/customers?limit=${e.target.value}`);
  };
  return (
    <main className={styles.main}>
      <Form.Select
        aria-label="Default select"
        size="lg"
        onChange={(e) => onChangeLimit(e)}
      >
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Form.Select>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x, i) => (
            <tr key={x.uuid}>
              <td>{i + 1}</td>
              <td>{x.name}</td>
              <td>{x.email}</td>
              <td>{x.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const limit = query?.limit || 10;
  const res = await fetch(`https://randomuser.me/api?results=${limit}`);
  const data = await res.json();
  if (data.length === 0) {
    return {
      notFound: true,
    };
  }
  const users = data.results.map((x: any) => ({
    name: `${x.name.title} ${x.name.first} ${x.name.last}`,
    gender: x.gender,
    email: x.email,
    uuid: x.login.uuid,
  }));

  return {
    props: {
      users,
    },
  };
};

export default Page;
