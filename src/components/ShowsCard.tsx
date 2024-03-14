import { Card, Image, CardBody, Stack, Heading, Text } from '@chakra-ui/react';
import APIClient from '../services/api-client';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { IoIosArrowDropleftCircle } from 'react-icons/io';

interface Show {
  id: number;
  image: string;
  name: string;
  location: {
    name: string;
  };
}

const ShowsCard = () => {
  const [page, setPage] = useState(1);

  const apiClient = new APIClient(`/character/?page=${page}`);

  const { data } = useQuery({
    queryKey: ['characters', page],
    queryFn: apiClient.getAll,
    cacheTime: 0,
  });

  return (
    <>
      <div className='container'>
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
      </div>
      <div className='arrows'>
        <IoIosArrowDropleftCircle
          className='arrow'
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        />
        <IoIosArrowDroprightCircle
          className='arrow'
          onClick={() => setPage(page + 1)}
        />
      </div>
    </>
  );
};

export default ShowsCard;
