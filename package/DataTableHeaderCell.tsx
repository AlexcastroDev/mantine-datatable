import { Box, Center, createStyles, Group, type MantineTheme, type Sx } from '@mantine/core';
import { IconArrowsVertical, IconArrowUp } from '@tabler/icons-react';
import type { CSSProperties, ReactNode } from 'react';
import type { DataTableColumn, DataTableSortStatus } from './types';
import { humanize, useMediaQueryStringOrFunction } from './utils';

const useStyles = createStyles((theme) => ({
  sortableColumnHeader: {
    cursor: 'pointer',
    transition: 'background .15s ease',
    '&:hover': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  sortableColumnHeaderGroup: {
    gap: '0.25em',
  },
  columnHeaderText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  sortableColumnHeaderText: {
    minWidth: 0,
    flexGrow: 1,
  },
  sortableColumnHeaderIcon: {
    transition: 'transform .15s ease',
  },
  sortableColumnHeaderIconRotated: {
    transform: 'rotate3d(0, 0, 1, 180deg)',
  },
  sortableColumnHeaderNeutralIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    transition: 'color .15s ease',
    'th:hover &': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },
  },
}));

type DataTableHeaderCell<T> = {
  className?: string;
  sx?: Sx;
  style?: CSSProperties;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: ReactNode | undefined;
  sortStatus: DataTableSortStatus | undefined;
  onSortStatusChange: ((sortStatus: DataTableSortStatus) => void) | undefined;
} & Pick<DataTableColumn<T>, 'accessor' | 'sortable' | 'textAlignment' | 'width'>;

export default function DataTableHeaderCell<T>({
  className,
  sx,
  style,
  accessor,
  visibleMediaQuery,
  title,
  sortable,
  textAlignment,
  width,
  sortStatus,
  onSortStatusChange,
}: DataTableHeaderCell<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  const text = title ?? humanize(accessor);
  const tooltip = typeof text === 'string' ? text : undefined;
  const sortAction =
    sortable && onSortStatusChange
      ? () => {
          onSortStatusChange({
            columnAccessor: accessor,
            direction: sortStatus?.direction === 'asc' ? 'desc' : 'asc',
          });
        }
      : undefined;
  return (
    <Box
      component="th"
      className={cx({ [classes.sortableColumnHeader]: sortable }, className)}
      sx={[
        {
          '&&': { textAlign: textAlignment },
          width,
          minWidth: width,
          maxWidth: width,
        },
        sx,
      ]}
      style={style}
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      onClick={sortAction}
      onKeyDown={(e) => e.key === 'Enter' && sortAction?.()}
    >
      {sortable || sortStatus?.columnAccessor === accessor ? (
        <Group className={classes.sortableColumnHeaderGroup} position="apart" noWrap>
          <Box className={cx(classes.columnHeaderText, classes.sortableColumnHeaderText)} title={tooltip}>
            {text}
          </Box>
          <Center>
            {sortStatus?.columnAccessor === accessor ? (
              <IconArrowUp
                className={cx(classes.sortableColumnHeaderIcon, {
                  [classes.sortableColumnHeaderIconRotated]: sortStatus.direction === 'desc',
                })}
                aria-label={`Sorted ${sortStatus.direction === 'desc' ? 'descending' : 'ascending'}`}
                size={14}
              />
            ) : (
              <IconArrowsVertical className={classes.sortableColumnHeaderNeutralIcon} size={14} />
            )}
          </Center>
        </Group>
      ) : (
        <Box className={classes.columnHeaderText} title={tooltip}>
          {text}
        </Box>
      )}
    </Box>
  );
}
