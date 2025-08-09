import { Box, Progress } from "@chakra-ui/react"
import { memo } from "react";
interface IProgress {
    value: number;
}
const MProgress = ({value}: IProgress) => {
  return (
    <Progress.Root value={value} maxW="100%" position="relative">
     {/* cricel */}
     <Box boxSize={'22px'} borderRadius="50%" bg="white" border="7px solid #000" position="absolute" top="-10px"  zIndex={1}/>
      
      <Progress.Track h={"4px"}> 
        <Progress.Range h={"4px"}/>
      </Progress.Track>
    </Progress.Root>
  )
}

export default memo(MProgress);
