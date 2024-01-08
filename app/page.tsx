import AddModal from '@/components/addModal';
import CategoryButtonSelected from '@/components/categoryButton';
import FormDialog from '@/components/modal';
import db from '@/db';
import { Container, Typography } from '@mui/material';

const App: React.FC = async () => {
  const categorys = await db.category.findMany({
    select: {
      name: true,
      id: true
    }
  })
  return (
    <>
      <Container className='flex items-center justify-center flex-col w-full h-[100vh] gap-4 text-center text-white'>
        <Typography variant='h4'>Selecione uma categoria</Typography>
        <Container className='flex items-center justify-center flex-row gap-1'>
          {categorys.map((item) => <CategoryButtonSelected id={item.id} key={item.id}>
            {item.name}
          </CategoryButtonSelected>)}
        </Container>
      </Container>
      <AddModal/>
    </>
  );
};

export default App;
