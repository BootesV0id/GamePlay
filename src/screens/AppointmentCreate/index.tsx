import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { styles } from "./styles";
import { theme } from '../../global/styles/theme';

import { Header } from "../../components/Header";
import { Background } from "../../components/Background";
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../config/database';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildModal, setOpenGuildModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();



  function handleOpenGuilds() {
    setOpenGuildModal(true)
  }

  function handleCloseGuilds() {
    setOpenGuildModal(false)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect)
    setOpenGuildModal(false)
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate(/* Funcionando */'Home');

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Background >
            <Header
              title="Agendar Parida"
            />
            <Text style={[
              styles.label,
              {
                marginLeft: 24,
                marginTop: 36,
                marginBottom: 18
              }
            ]}>
              Categoria
            </Text>
            <CategorySelect
              hasCheckBox
              setCategory={handleCategorySelect}
              categorySelected={category}
            />

            <View style={styles.form}>
              <RectButton onPress={handleOpenGuilds}>
                <View style={styles.select}>
                  {
                    guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />
                  }
                  <View style={styles.selectBody}>
                    <Text style={styles.label}>
                      {guild.name ? guild.name : 'Selecione um servidor'}
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    size={18}
                    color={theme.colors.heading}
                  />
                </View>
              </RectButton>
              <View style={styles.field}>
                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Dia e mês
                  </Text>
                  <View style={styles.column}>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setDay}
                    />
                    <Text style={styles.divider}>/</Text>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setMonth}
                    />
                  </View>
                </View>

                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Hora e Minuto
                  </Text>
                  <View style={styles.column}>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setHour}
                    />
                    <Text style={styles.divider}>:</Text>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setMinute}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.field, { marginBottom: 12 }]}>
                <Text style={styles.label}>
                  Descrição
                </Text>
                <Text style={styles.caracteresLimit}>
                  Max 100 caracteres
                </Text>
              </View>
              <TextArea
                multiline
                maxLength={100}
                numberOfLines={5}
                autoCorrect={false}
                onChangeText={setDescription}
              />

              <View style={styles.footer}>
                <Button
                  title="Agendar"
                  onPress={handleSave}
                />
              </View>
            </View>
          </Background >
        </ScrollView>
      </Background>
      <ModalView visible={openGuildModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>

  );
}
