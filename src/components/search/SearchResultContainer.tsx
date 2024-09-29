import Button from '@/components/common/Button';

import { Stack } from '@mui/material';

import { useQueryString } from '@/hooks';
import { QUERY_PARAM_KEY } from '@/constants/key';
import GridCard from '@/components/GridCard';
import { formatToursiteType } from '@/utils/formatter';
import { useAddToursiteToCourseMutation } from '@/queries/useAddToursiteToCourseMutation';
import { Toursite } from '@/schemas/types';

const SearchResultContainer = ({ searchResults }: { searchResults: Toursite[] }) => {
  const { getParams } = useQueryString();
  const [targetId, targetDay] = [getParams(QUERY_PARAM_KEY.TARGET_ID), getParams(QUERY_PARAM_KEY.TARGET_DAY)];
  const { mutate: addToursiteToCourseMutate } = useAddToursiteToCourseMutation({ groupId: Number(targetId) });

  const addMode = !!targetId && !!targetDay;

  return (
    <Stack sx={{ padding: '8px 14px' }}>
      <GridCard.Wrapper>
        {searchResults.map((result) => (
          <GridCard.Item
            key={result.tourSiteId}
            thumbnail={result.photoUrls[0]}
            title={result.name}
            tag={formatToursiteType(result.type)}
            price={result.cost}
            bottom={
              addMode ? (
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{
                    height: '26px',
                    marginTop: '6px',
                  }}
                  onClick={() => {
                    addToursiteToCourseMutate({
                      groupId: Number(targetId),
                      day: Number(targetDay),
                      toursiteId: result.tourSiteId,
                    });
                  }}
                >
                  담기
                </Button>
              ) : null
            }
          />
        ))}
      </GridCard.Wrapper>
    </Stack>
  );
};

export default SearchResultContainer;
