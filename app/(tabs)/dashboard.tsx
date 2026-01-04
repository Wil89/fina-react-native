import { Button, Card, GlassView, Input, Text } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardExample() {
  const theme = useTheme();
  const [amount, setAmount] = useState("");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="caption1" color="secondary">
              Welcome back,
            </Text>
            <Text variant="largeTitle">John Doe</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.notificationButton,
              { backgroundColor: theme.colors.secondaryBackground },
            ]}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Balance Card - Glass Effect */}
        <GlassView
          intensity={25}
          style={[styles.balanceCard, { marginTop: theme.spacing.lg }]}
        >
          <View style={styles.balanceContent}>
            <Text variant="callout" color="secondary">
              Total Balance
            </Text>
            <Text variant="largeTitle" style={styles.balanceAmount}>
              $12,458.50
            </Text>
            <View style={styles.balanceChange}>
              <Ionicons
                name="trending-up"
                size={16}
                color={theme.colors.success}
              />
              <Text variant="footnote" color="success">
                {" "}
                +12.5% this month
              </Text>
            </View>
          </View>
        </GlassView>

        {/* Quick Actions */}
        <View style={[styles.section, { marginTop: theme.spacing.xl }]}>
          <Text variant="headline">Quick Actions</Text>

          <View style={styles.quickActionsGrid}>
            <Card
              shadow="sm"
              style={styles.actionCard}
              padding={theme.spacing.md}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: theme.palette.primary[100] },
                ]}
              >
                <Ionicons name="add" size={24} color={theme.colors.tint} />
              </View>
              <Text variant="callout" align="center" style={styles.actionText}>
                Add Income
              </Text>
            </Card>

            <Card
              shadow="sm"
              style={styles.actionCard}
              padding={theme.spacing.md}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#FEE2E2" }]}>
                <Ionicons name="remove" size={24} color={theme.colors.error} />
              </View>
              <Text variant="callout" align="center" style={styles.actionText}>
                Add Expense
              </Text>
            </Card>

            <Card
              shadow="sm"
              style={styles.actionCard}
              padding={theme.spacing.md}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#F3E8FF" }]}>
                <Ionicons name="swap-horizontal" size={24} color="#9333EA" />
              </View>
              <Text variant="callout" align="center" style={styles.actionText}>
                Transfer
              </Text>
            </Card>

            <Card
              shadow="sm"
              style={styles.actionCard}
              padding={theme.spacing.md}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#FEF3C7" }]}>
                <Ionicons name="stats-chart" size={24} color="#F59E0B" />
              </View>
              <Text variant="callout" align="center" style={styles.actionText}>
                Analytics
              </Text>
            </Card>
          </View>
        </View>

        {/* Input Example */}
        <View style={[styles.section, { marginTop: theme.spacing.xl }]}>
          <Text variant="headline">Quick Transfer</Text>

          <Input
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            leftIcon={
              <Text variant="body" color="secondary">
                $
              </Text>
            }
          />

          <Button variant="primary" size="lg" fullWidth>
            Send Money
          </Button>
        </View>

        {/* Recent Transactions */}
        <View style={[styles.section, { marginTop: theme.spacing.xl }]}>
          <View style={styles.sectionHeader}>
            <Text variant="headline">Recent Transactions</Text>
            <TouchableOpacity>
              <Text variant="callout" color="tint">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <Card shadow="sm" padding={0}>
            {[
              {
                title: "Salary Deposit",
                amount: "+$5,200",
                date: "Today",
                icon: "briefcase",
                color: theme.colors.success,
                positive: true,
              },
              {
                title: "Grocery Shopping",
                amount: "-$124.50",
                date: "Yesterday",
                icon: "cart",
                color: theme.colors.error,
                positive: false,
              },
              {
                title: "Netflix Subscription",
                amount: "-$15.99",
                date: "2 days ago",
                icon: "play-circle",
                color: theme.colors.error,
                positive: false,
              },
            ].map((transaction, index, arr) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.transactionItem,
                  {
                    borderBottomWidth: index < arr.length - 1 ? 1 : 0,
                    borderBottomColor: theme.colors.separator,
                    padding: theme.spacing.md,
                  },
                ]}
              >
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.transactionIcon,
                      { backgroundColor: theme.colors.secondaryBackground },
                    ]}
                  >
                    <Ionicons
                      name={transaction.icon as any}
                      size={24}
                      color={theme.colors.text}
                    />
                  </View>
                  <View>
                    <Text variant="callout">{transaction.title}</Text>
                    <Text variant="footnote" color="secondary">
                      {transaction.date}
                    </Text>
                  </View>
                </View>

                <Text
                  variant="calloutEmphasized"
                  style={{ color: transaction.color }}
                >
                  {transaction.amount}
                </Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Button Variants Showcase */}
        <View style={[styles.section, { marginTop: theme.spacing.xl }]}>
          <Text variant="headline">Button Styles</Text>

          <View style={styles.buttonShowcase}>
            <Button variant="primary" size="lg" fullWidth>
              Primary Button
            </Button>

            <Button variant="secondary" size="lg" fullWidth>
              Secondary Button
            </Button>

            <Button variant="ghost" size="lg" fullWidth>
              Ghost Button
            </Button>

            <Button variant="destructive" size="lg" fullWidth>
              Destructive Button
            </Button>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: theme.spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
  },
  balanceContent: {
    alignItems: "center",
  },
  balanceAmount: {
    marginTop: 8,
    marginBottom: 8,
  },
  balanceChange: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    marginTop: 4,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonShowcase: {
    gap: 12,
  },
});
