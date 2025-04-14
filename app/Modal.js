import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingModal = ({ visible }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#C90C0CFF" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },
});

export default LoadingModal;
