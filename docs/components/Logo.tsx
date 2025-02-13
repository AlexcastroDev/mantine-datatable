import { Code, createStyles, Text, ThemeIcon } from '@mantine/core';
import { IconTable } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  root: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  iconInsideHeader: {
    '@media (max-width: 300px)': {
      display: 'none',
    },
  },
  title: {
    font: '24px/1 BenchNine, sans-serif',
    margin: '0 0 -3px',
  },
  version: {
    fontSize: 11,
    lineHeight: 1,
    padding: '3px 4px 0',
    margin: '-8px 0 0 -4px',
  },
  versionInsideHeader: {
    '@media (max-width: 359px)': {
      display: 'none',
    },
  },
}));

export default function Logo({ className, insideHeader }: { className?: string; insideHeader?: boolean }) {
  const { classes, cx } = useStyles();
  return (
    <Link className={cx(classes.root, className)} href="/">
      <ThemeIcon className={cx({ [classes.iconInsideHeader]: insideHeader })} size="md" radius="lg">
        <IconTable size={16} />
      </ThemeIcon>
      <Text className={classes.title} component="h1">
        Mantine DataTable
      </Text>
      <Code className={cx(classes.version, { [classes.versionInsideHeader]: insideHeader })}>
        {process.env.PACKAGE_VERSION}
      </Code>
    </Link>
  );
}
