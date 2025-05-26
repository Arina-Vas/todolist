import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import { containerSX } from "@/common/styles/container.styles.ts"

export const TasksSkeleton = () => (
  <Box style={{ padding: "8px 0" }}>
    {Array(4)
      .fill(null)
      .map((_, id) => (
        <Box key={id} sx={containerSX}>
          <Box sx={containerSX} style={{ gap: "15px" }}>
            <Skeleton width={20} height={40} />
            <Skeleton width={150} height={40} />
          </Box>
          <Skeleton width={20} height={40} />
        </Box>
      ))}
  </Box>
)