import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Button2} from './Button';
import Images from '../assets/Images';

export type SubtaskType = {
  id: number;
  name: string;
  completed: boolean;
};

type SubtaskItemProps = {
  id: number;
  name: string;
  completed: boolean;
  onChange: (id: number, updates: Partial<SubtaskType>) => void;
  onRemove: (id: number) => void;
};

const SubtaskItem = ({
  id,
  name,
  completed,
  onChange,
  onRemove,
}: SubtaskItemProps) => {
  const [text, setText] = useState(name);

  return (
    <View style={styles.main}>
      <View style={styles.leftSection}>
        <CheckBox
          value={completed}
          onValueChange={value => onChange(id, {completed: value})}
          tintColors={{true: '#9B7CF9', false: '#4C4B50'}}
        />
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={value => {
            setText(value);
            onChange(id, {name: value});
          }}
          placeholder="Subtask name"
          placeholderTextColor="#6E6E7A"
        />
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => onRemove(id)}>
          <Button2 imagePath={Images.bin} width={45} height={42} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1C1C26',
    padding: 12,
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderColor: '#764BA2',
    flex: 1,
    paddingVertical: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SubtaskItem;
