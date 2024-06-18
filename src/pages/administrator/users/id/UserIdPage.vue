<template>
  <div class="q-pa-md">
    <div class="q-ma-md">
      <q-btn flat dense icon="arrow_back_ios" rounded to="/admin/users" />
    </div>
    <div class="user-profile-page q-pa-md">
      <div class="row q-col-gutter-md">
        <!-- Left Column: Profile Card -->
        <div class="col-12 col-md-4">
          <q-card class="profile-card q-pa-md">
            <q-card-section class="row items-center justify-center">
              <q-avatar size="100px">
                <img
                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                  alt="Profile Picture"
                />
              </q-avatar>
            </q-card-section>
            <q-card-section>
              <div align="center">
                <div class="text-h5 text-center">{{ user.name }}</div>
                <div class="text-subtitle2 text-center q-mb-md">
                  {{ user.email }}
                </div>
                <q-chip text-color="white" color="negative">
                  {{ user.position }}
                </q-chip>
              </div>
              <q-list separator>
                <q-item>
                  <q-item-section>Phone:</q-item-section>
                  <q-item-section>{{ user.phone }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Address:</q-item-section>
                  <q-item-section>{{ user.address }}</q-item-section>
                </q-item>
              </q-list>
              <div align="center">
                <q-btn
                  label="Edit Profile"
                  color="primary"
                  class="q-mt-md"
                  @click="saveProfile"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Right Column: Accounts and Bills Cards -->
        <div class="col-12 col-md-8">
          <div class="row q-col-gutter-md">
            <!-- My Schedule Card -->
            <div class="col-12">
              <q-card class="account-card q-pa-md">
                <q-card-section>
                  <div class="text-h6">My Schedule</div>
                </q-card-section>
                <q-list separator>
                  <q-item>
                    <q-item-section>
                      <div>Active account:</div>
                      <div>{{ user.accounts.active }}</div>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        flat
                        label="Block Account"
                        color="negative"
                        @click="blockAccount('active')"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <div>Blocked account:</div>
                      <div>{{ user.accounts.blocked }}</div>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        flat
                        label="Unlock Account"
                        color="positive"
                        @click="unlockAccount('blocked')"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>

            <!-- Bills Card -->
            <div class="col-12">
              <q-card class="bills-card q-pa-md">
                <q-card-section>
                  <div class="text-h6">My Bills</div>
                </q-card-section>
                <q-list separator>
                  <q-item v-for="bill in user.bills" :key="bill.id">
                    <q-item-section>{{ bill.name }}</q-item-section>
                    <q-item-section side>
                      <q-icon
                        :name="bill.paid ? 'check_circle' : 'cancel'"
                        :color="bill.paid ? 'green' : 'red'"
                      />
                      <q-btn
                        flat
                        :label="bill.paid ? 'Bill Paid' : 'Not Paid'"
                        color="primary"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const user = reactive({
  name: "John Mash Doe",
  position: "Super Admin",
  email: "john.doe123@gmail.com",
  phone: "+(63) 111 - 111 - 1111",
  address: "Street 123",
  accounts: {
    active: "9844 5600 8234 4256",
    blocked: "9844 5600 8234 1234",
  },
  bills: [
    { id: 1, name: "Monthly Bill", paid: true },
    { id: 2, name: "Monthly Bill", paid: false },
    { id: 3, name: "Monthly Bill", paid: true },
    { id: 4, name: "Monthly Bill", paid: false },
  ],
});

function saveProfile() {
  console.log("Profile saved:", user);
}

function blockAccount(accountType) {
  console.log(`Block ${accountType} account`);
}

function unlockAccount(accountType) {
  console.log(`Unlock ${accountType} account`);
}
</script>

<style scoped>
.elegant-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
}
.user-profile-page {
  max-width: 1200px;
  margin: auto;
}

.profile-card,
.account-card,
.bills-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.profile-card q-card-section:first-child {
  margin-top: 1rem;
}

.q-list q-item {
  align-items: center;
  padding: 1rem 0.5rem;
}

.q-list q-item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.q-list q-item-section {
  color: #666;
  font-size: 0.9rem;
}

.q-list q-item-section:first-child {
  flex: 1 1 auto;
}

.q-list q-item-section[side] {
  flex: 0 0 auto;
}

.q-btn {
  min-width: 90px;
}

.q-btn[flat] {
  padding: 0 8px;
}
</style>
