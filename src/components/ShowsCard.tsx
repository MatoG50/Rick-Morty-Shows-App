import { Card, Image, CardBody, Stack, Heading, Text } from '@chakra-ui/react';
import APIClient from '../services/api-client';
import { useQuery } from 'react-query';

interface Show {
  id: number;
  image: string;
  name: string;
  location: {
    name: string;
  };
}

const apiClient = new APIClient('/character');

const ShowsCard = () => {
  const { data } = useQuery({
    queryKey: ['characters'],
    queryFn: apiClient.getAll,
  });

  return (
    <>
      {data?.results.map((res: Show) => (
        <Card
          key={res.id}
          // maxW='sm'
          className='card'
          padding='0'
          borderRadius='lg'
        >
          <Image src={res.image} alt='img' className='image' />
          <CardBody backgroundColor='white'>
            <Stack>
              <Heading color='black' size='md'>
                {res.name}
              </Heading>
              <Text color='black'>{res.location.name}</Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default ShowsCard;
