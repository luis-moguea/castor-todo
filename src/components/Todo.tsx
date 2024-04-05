import { Box, Heading, Icon, Text, Checkbox } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";

interface Props {
  title: string;
  date: Timestamp;
  description: string;
  completed: boolean;
  onChange: () => void;
  id: number;
  onClick: () => void;
}

// todo structure

const Todo = ({
  onClick,
  id,
  title,
  date,
  description,
  completed,
  onChange,
}: Props) => {
  //  format firebase timestamp default date format to convert into a js readable date

  const formattedDate = date ? date.toDate().toLocaleString() : "";

  return (
    <>
      {!completed ? (
        <Box
          mt="30px"
          border="solid black 1px"
          borderRadius="10px"
          padding="1em"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Text fontSize="14px" fontWeight="bold">
                Title
              </Text>
              <Text fontSize="13px">{title}</Text>
            </Box>
            <Box display="flex" alignItems="center">
              <Text fontSize="14px" margin="10px" fontWeight="bold">
                Created At:
              </Text>
              <Text fontSize="12px" color="red">
                {formattedDate}
              </Text>
            </Box>
            <Checkbox color="blue" onChange={onChange}></Checkbox>
          </Box>
          <Box mt="8px">
            <Text fontSize="13px" fontWeight="bold">
              Description
            </Text>
            <Text fontSize="12px">{description}</Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mt="8px" display="flex" alignItems="center">
              <Text fontSize="13px" fontWeight="bold" mr="10px">
                ID:
              </Text>
              <Text fontSize="10px">{id}</Text>
            </Box>
            <Icon onClick={onClick} _hover={{ cursor: "pointer" }}>
              <FaRegTrashAlt size="20px" />
            </Icon>
          </Box>
        </Box>
      ) : (
        <Box display="flex" gap="15px" mt="30px" alignItems="center">
          <Heading>Task Completed</Heading>
          <Checkbox isChecked={completed} onChange={onChange}></Checkbox>
          <Icon onClick={onClick} _hover={{ cursor: "pointer" }}>
            <FaRegTrashAlt size="20px" />
          </Icon>
        </Box>
      )}
    </>
  );
};

export default Todo;
