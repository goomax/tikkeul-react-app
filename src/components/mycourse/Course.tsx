import Chip from '@/components/common/Chip';
import IconButton from '@/components/common/IconButton';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import Typography from '@/components/common/Typography';
import { Group } from '@/schemas/types';
import { Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteToursiteMutation } from '@/queries/useDeleteToursiteMutation';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRef } from 'react';
import { useUpdateOrderMutation } from '@/queries/useUpdateOrderMutation';
import { useGetGroupQuery } from '@/queries/useGetGroupQuery';
import { useDraggable } from '@/hooks';

interface CourseViewerProps {
  dayCourse: Group['courseDetails'];
  day: number;
}

interface CourseEditorProps {
  dayCourse: Group['courseDetails'];
  day: number;
}

const CourseViewer = ({ dayCourse, day }: CourseViewerProps) => {
  return (
    <>
      {dayCourse.length > 0 ? (
        <Stepper
          activeStep={-1}
          orientation="vertical"
          sx={{
            '& .MuiStepIcon-text': {
              fill: 'white',
            },
          }}
        >
          {dayCourse.map((toursite, index) => {
            return (
              <Step key={day + toursite.tourSiteId + index}>
                <StepLabel>
                  <StepCard
                    name={toursite.name}
                    address={toursite.address}
                    recommendType={toursite.recommendType}
                    photoUrl={toursite.photoUrl}
                  />
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      ) : (
        <EmptyLocation />
      )}
    </>
  );
};

const CourseEditor = ({ dayCourse, day }: CourseEditorProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {dayCourse.length > 0 ? (
        dayCourse.map((toursite, index) => (
          <EdiatableCard key={day + toursite.tourSiteId + index} toursite={toursite} index={toursite.order} />
        ))
      ) : (
        <EmptyLocation />
      )}
    </DndProvider>
  );
};

const EdiatableCard = ({ toursite, index }: { toursite: Group['courseDetails'][number]; index: number }) => {
  const { currentGroup } = useGetUserQuery();
  const { getDayByOrder } = useGetGroupQuery({ groupId: Number(currentGroup?.groupId) });

  const { isDraggable, onDraggable, onDisDraggable } = useDraggable();

  const { mutate: deleteToursiteMutate } = useDeleteToursiteMutation({
    groupId: currentGroup?.groupId ?? 0,
  });

  const { mutate: updateOrderMutate } = useUpdateOrderMutation({ groupId: currentGroup?.groupId ?? 0 });

  const originalIndexRef = useRef(index);

  const [, drag] = useDrag({
    canDrag: () => isDraggable,
    type: 'card',
    item: { index },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop && item.index !== originalIndexRef.current) {
        const from = originalIndexRef.current;
        const to = item.index;
        const day = getDayByOrder(item.index);

        updateOrderMutate({ from, to, day, groupId: currentGroup?.groupId ?? 0 });
      }
    },
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        item.index = index;
      }
    },
  });

  return (
    <Stack
      ref={(node) => drag(drop(node))}
      key={toursite.tourSiteId}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <IconButton sx={{ cursor: 'grab' }} onMouseOver={onDraggable} onMouseOut={onDisDraggable}>
        <DragIndicatorIcon sx={{ color: 'grey.400' }} />
      </IconButton>
      <StepCard
        name={toursite.name}
        address={toursite.address}
        recommendType={toursite.recommendType}
        photoUrl={toursite.photoUrl}
      />
      <IconButton
        onClick={() => {
          deleteToursiteMutate({ groupId: Number(currentGroup?.groupId), toursiteId: toursite.tourSiteId });
        }}
      >
        <DeleteIcon sx={{ color: 'grey.400' }} />
      </IconButton>
    </Stack>
  );
};

const StepCard = ({
  name,
  address,
  recommendType,
  photoUrl,
}: Pick<Group['courseDetails'][number], 'name' | 'photoUrl' | 'address' | 'recommendType'>) => {
  const theme = useTheme();

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap="20px"
      bgcolor={theme.palette.background.default}
      sx={{
        width: '260px',
        padding: '8px 14px',
        borderRadius: '4px',
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
        marginLeft: '10px',
      }}
    >
      <ImageWithSkeleton width={52} height={52} variant="rectangular" src={photoUrl} alt={name} />
      <Stack gap="8px">
        <Stack flexDirection="row" gap="8px">
          <Chip
            radiusVariant="square"
            color="default"
            sx={{
              height: '19px',
              '& .MuiChip-label': {
                padding: '1px',
                fontSize: '10px',
              },
            }}
            label={recommendType}
          />
          <Typography fontSize={12} bold>
            {name}
          </Typography>
        </Stack>
        <Typography fontSize={10} color="grey">
          {address}
        </Typography>
      </Stack>
    </Stack>
  );
};

const EmptyLocation = () => {
  return (
    <Typography
      fontSize={11}
      color="grey"
      textAlign="center"
      sx={{
        marginBottom: '15px',
      }}
    >
      아직 담은 장소가 없어요!
    </Typography>
  );
};

export default {
  Viewer: CourseViewer,
  Editor: CourseEditor,
};
