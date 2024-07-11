// src/components/UserList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registration.css'
import { 
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, CircularProgress, Pagination, TextField 
} from '@mui/material';

interface IUser {
  _id: string;
  username: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getAllUsers?page=${page}`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/delete/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(event)
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <h1 className='text-center heading-list'>User List</h1>
      <hr />
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} 
          />
        </>
      )}
    </Container>
  );
};

export default UserList;
