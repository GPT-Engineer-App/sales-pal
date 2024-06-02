import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [records, setRecords] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const toast = useToast();

  const addRecord = () => {
    if (!description || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newRecord = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
    };

    setRecords([...records, newRecord]);
    setDescription("");
    setAmount("");
    setType("expense");
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Sales, Purchase, and Daily Expenses Record
        </Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input placeholder="Type (expense/sale/purchase)" value={type} onChange={(e) => setType(e.target.value)} />
          <IconButton aria-label="Add record" icon={<FaPlus />} onClick={addRecord} />
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map((record) => (
              <Tr key={record.id}>
                <Td>{record.description}</Td>
                <Td>{record.amount}</Td>
                <Td>{record.type}</Td>
                <Td>
                  <IconButton aria-label="Delete record" icon={<FaTrash />} onClick={() => deleteRecord(record.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
