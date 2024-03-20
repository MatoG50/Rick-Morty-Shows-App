import { Card, Image, CardBody, Stack, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import useCharacters, { Character } from '../hooks/useCharacters';

const ShowsCard = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCharacters(page);

  if (isLoading) return <div>isLoading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      <div className='header'>
        <Heading color='rgb(27,26,26)'>Rick and Morty</Heading>
      </div>
      <div className='container'>
        {data?.results.map((res: Character) => (
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
          onClick={() => {
            setPage(page + 1);
          }}
        />
      </div>
    </>
  );
};

export default ShowsCard;
