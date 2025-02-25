import {
  HStack,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { Layout } from '../../navigator/Layout';
import moment from 'moment';
import 'moment/locale/kk';
import Text from '../../components/Text/Text';
import { styles } from './styles';
import BlueCard from '../../components/BlueCard/BlueCard';
import YellowCard from '../../components/YellowCard/YellowCard';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenProps } from '../../navigator/homeStackNavigator';
import { useUser } from '../../store/user';
import { ReadKuranScreenProps } from '../../navigator/readKuranStack';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const navigation = useNavigation<
    HomeScreenProps['navigation'] & ReadKuranScreenProps['navigation']
  >();
  const { t } = useTranslation();
  const { currentUser } = useUser();
  moment.locale('kk');
  const [day, month, year] = moment().format('DD MMMM, YYYY').split(' ');
  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const formattedDate = `${day} ${formattedMonth} ${year}`;

  return (
    <Layout bottom top padding>
      <VStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack style={styles.container}>
            <HStack style={styles.tabHeader}>
              <Text color={'#B9B9BC'} style={styles.timeText}>
                {formattedDate}
              </Text>
              {/* <Pressable
                onPress={() => {}}
                style={styles.notificationIcon}
                hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
              >
                <Icon as={NotificationIcon} />
              </Pressable> */}
            </HStack>
            <VStack width={'100%'} height={'100%'}>
              <VStack w={'100%'} pt={30}>
                <Text style={styles.textHeader}>{t('hello')}</Text>
                <Text style={styles.textHeader}>
                  {`${currentUser?.name}!`}
                </Text>
              </VStack>
              <VStack flex={1} style={styles.cardContainer}>
                  <YellowCard
                    onPress={() => {
                      navigation.navigate('ClassLevel');
                    }}
                  />
                  <BlueCard
                    onPress={() => {
                      navigation.navigate('ReadKuran');
                    }}
                  />
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default HomeScreen;
