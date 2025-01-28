import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {dynamicDashboardData as fullData} from '@utils/db';

import Sponser from '@modules/home/organisms/Sponser';
import AdCarousel from '@modules/home/organisms/AdCarousel';
import Categories from '@modules/home/organisms/Categories';
import VerticalList from '@modules/home/organisms/VerticalList';
import HorizontalList from '@modules/home/organisms/HorizontalList';
import AnimatedHorizontalList from '@modules/home/organisms/AnimatedHorizontalList';

const sectionComponent: {[key: string]: React.ComponentType<any>} = {
  ad_carousel: AdCarousel,
  categories: Categories,
  sponser: Sponser,
  vertical_list: VerticalList,
  horizontal_list: HorizontalList,
  animated_horizontal_list: AnimatedHorizontalList,
};

const PAGE_SIZE = 4;

const MainList: React.FC<{scrollYGlobal: any}> = ({scrollYGlobal}) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [data, setDate] = useState<any[]>(fullData.slice(0, PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const preScrollY = useRef(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset.y;
    scrollYGlobal.value = currentScrollY;
    preScrollY.current = currentScrollY;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setCurrentPage(1);
      setDate(fullData.slice(0, PAGE_SIZE));
      setIsRefreshing(false);
    }, 3000);
  };

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    if (data?.length >= fullData?.length) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newItems = fullData?.slice(0, nextPage * PAGE_SIZE);
      setDate(newItems);
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
    }, 4000);
  };

  const renderItem = ({item}: any) => {
    const SectionComponent = sectionComponent[item?.type];
    return SectionComponent ? <SectionComponent data={item} /> : null;
  };

  return (
    <FlatList
      ref={flatListRef}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      data={data}
      renderItem={renderItem}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScroll={handleScroll}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      nestedScrollEnabled
      contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 225 : 300,
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator
            size={'small'}
            color={'#888'}
            style={{alignSelf: 'center', margin: 15}}
          />
        ) : null
      }
    />
  );
};

export default MainList;
