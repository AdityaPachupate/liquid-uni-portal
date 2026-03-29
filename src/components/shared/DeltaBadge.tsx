import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  value: number;
  suffix?: string;
}

export const DeltaBadge = ({ value, suffix = '%' }: Props) => {
  const isPositive = value >= 0;
  return (
    <span className={`tag-pill ${isPositive ? 'tag-green' : 'tag-red'}`}>
      {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {isPositive ? '+' : ''}{value.toFixed(2)}{suffix}

    </span>
  );
};
