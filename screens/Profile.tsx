import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Profile:React.FC<any> = ({navigation}) => {
  const [username, setUserName] = useState<string>('');
// const navigation = useNavigation()


  return (
    <View style={{flex: 1, padding: 60, backgroundColor: 'white'}}>
      <Text>fgvdf</Text>
    </View>
  );
};

export default Profile;
