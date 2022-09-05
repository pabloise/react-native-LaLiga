import * as React from 'react';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';

const SvgFile = ({uri, height, width}) => {
    return (
     <View>
      <SvgUri
       height={height}
       width={width}
       uri={uri}
      />
     </View>
    );
   }

export default SvgFile;