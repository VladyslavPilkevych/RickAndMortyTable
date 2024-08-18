export const checkUnknown = (value?: string) => {
  return value !== 'Unknown' && value !== 'unknown' ? (
    value
  ) : (
    <span className={'status__indicator status__indicator--unknown'}>
      {'Unknown'}
    </span>
  );
};
