import Icon from '@components/atoms/Icon';

interface TabIconsProps {
  focused: boolean;
  color: string;
  size: number;
}

export const HomeIcon: React.FC<TabIconsProps> = ({focused, color, size}) => {
  return (
    <Icon
      name={focused ? 'home' : 'home-outline'}
      color={color}
      size={size}
      iconFamily="Ionicons"
    />
  );
};

export const CategoriesIcon: React.FC<TabIconsProps> = ({
  focused,
  color,
  size,
}) => {
  return (
    <Icon
      name={focused ? 'grid' : 'grid-outline'}
      color={color}
      size={size}
      iconFamily="Ionicons"
    />
  );
};

export const AccountIcon: React.FC<TabIconsProps> = ({
  focused,
  color,
  size,
}) => {
  return (
    <Icon
      name={focused ? 'person' : 'person-outline'}
      color={color}
      size={size}
      iconFamily="Ionicons"
    />
  );
};

export const CartIcon: React.FC<TabIconsProps> = ({focused, color, size}) => {
  return (
    <Icon
      name={focused ? 'cart' : 'cart-outline'}
      color={color}
      size={size}
      iconFamily="MaterialCommunityIcons"
    />
  );
};
