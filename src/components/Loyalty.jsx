
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  FAB,
  Portal,
  Modal,
  Surface,
  ProgressBar,
  Divider,
} from 'react-native-paper';
import ChatView from './ChatView';
import { getOrderCount } from '../src/Order';

export default function Loyalty() {
  const [chatOpen, setChatOpen] = useState(false);
  const orderCount = getOrderCount();
  const ordersInCycle = orderCount % 10;
  const progress = ordersInCycle / 10;
  const ordersUntilFree = 10 - ordersInCycle;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <Text variant="headlineMedium" style={styles.heading}>
          Richie's Diner
        </Text>
        <Text variant="titleMedium" style={styles.subheading}>
          Loyalty Rewards
        </Text>

        <Divider style={styles.divider} />

        {/* Loyalty Card */}
        <Surface style={styles.card} elevation={3}>
          <Text variant="titleLarge" style={styles.cardTitle}>
            🏆 Your Progress
          </Text>

          <Text variant="displayMedium" style={styles.orderNumber}>
            {ordersInCycle}
            <Text variant="titleLarge" style={styles.outOf}> / 10</Text>
          </Text>

          <Text variant="bodyMedium" style={styles.cardSubtitle}>
            orders this cycle
          </Text>

          <ProgressBar
            progress={progress}
            color="#E8593C"
            style={styles.progressBar}
          />

          <Text variant="bodyLarge" style={styles.rewardText}>
            {ordersUntilFree === 10
              ? "🎉 Your next order is FREE! Order now!"
              : `${ordersUntilFree} more order${ordersUntilFree !== 1 ? 's' : ''} until your FREE meal!`}
          </Text>

          <Text variant="bodySmall" style={styles.totalText}>
            Total orders ever: {orderCount}
          </Text>
        </Surface>

        {/* How it works */}
        <Surface style={styles.infoCard} elevation={1}>
          <Text variant="titleMedium" style={styles.infoTitle}>
            How It Works
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Every order earns you a stamp{'\n'}
            • Complete 10 orders to earn a FREE meal{'\n'}
            • Use the chat button below to place an order{'\n'}
            • Your loyalty resets after every free reward
          </Text>
        </Surface>

      </ScrollView>

      {/* FAB — opens chat bot */}
      <FAB
        icon="chat"
        label="Order Now"
        style={styles.fab}
        onPress={() => setChatOpen(true)}
      />

      {/* Bottom Sheet Modal with ChatView */}
      <Portal>
        <Modal
          visible={chatOpen}
          onDismiss={() => setChatOpen(false)}
          contentContainerStyle={styles.bottomSheet}
        >
          <View style={styles.sheetHandle} />
          <Text variant="titleMedium" style={styles.sheetTitle}>
            Order with our bot
          </Text>
          <Divider />
          <View style={styles.chatContainer}>
            <ChatView />
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  heading: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subheading: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cardTitle: {
    marginBottom: 8,
    color: '#333',
  },
  orderNumber: {
    color: '#E8593C',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  outOf: {
    color: '#999',
  },
  cardSubtitle: {
    color: '#888',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  rewardText: {
    textAlign: 'center',
    color: '#E8593C',
    fontWeight: '600',
    marginBottom: 8,
  },
  totalText: {
    color: '#aaa',
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#fff',
  },
  infoTitle: {
    marginBottom: 12,
    color: '#333',
    fontWeight: '600',
  },
  infoText: {
    color: '#555',
    lineHeight: 26,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    backgroundColor: '#E8593C',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sheetTitle: {
    textAlign: 'center',
    paddingBottom: 12,
    color: '#333',
  },
  chatContainer: {
    flex: 1,
  },
});