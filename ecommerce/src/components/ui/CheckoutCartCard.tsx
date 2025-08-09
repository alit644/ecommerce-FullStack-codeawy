import { Box , CloseButton, Image} from "@chakra-ui/react";
import { useAppDispatch } from "../../App/store";
import { removeItem } from "../../App/features/cartSlice";
interface ICheckoutCartCard {
  src: string;
  alt: string
  id: number;
}
const CheckoutCartCard = ({src, alt, id}: ICheckoutCartCard) => {
 const dispatch = useAppDispatch();
 
   const handelRemove = () => {
     if (id !== null) {
       dispatch(removeItem(id as number));
     }
   };
 return (
    <Box position="relative" w="70px" h="80px" id={id.toString()}>
      <Image
        src={`${import.meta.env.VITE_BASE_URL}${src}`}
        alt={alt}
        w="70px"
        h="80px"
        objectFit="cover"
        borderRadius="md"
      />
      <CloseButton
        zIndex={1}
        variant="solid"
        size="2xs"
        colorScheme="red"
        position="absolute"
        top="-2"
        right="-2"
        onClick={handelRemove}/>
    </Box>
  );
};

export default CheckoutCartCard;
