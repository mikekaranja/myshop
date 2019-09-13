<template>
  <v-app>
    <v-navigation-drawer
      v-model="leftDrawer"
      style="z-index: 15;"
      left
      temporary
      :fixed="fixed"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Plan: {{ paymentplan ? paymentplan.split('$')[0] : '' }}
          </v-list-item-title>
          <v-list-item-subtitle>
            ${{ paymentplan ? paymentplan.split('$')[1] : '' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in draweritems"
          :key="item.title"
          link
          @click="navDrawerClick(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-show="topbar"
      style="z-index: 4;"
      color="white"
      flat
      :fixed="fixed"
      app
    >
      <v-btn icon @click.stop="leftDrawer = !leftDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn to="/search" icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content
      :style="{
        paddingTop: `${topbar ? '56px' : '0px'}`,
        background: 'white'
      }"
    >
      <div v-show="before24hours" class="navbar-alert">
        {{ paymentalert }}
        <span
          class="open-dialog"
          @click="kindlyPayBeforeDialog = !kindlyPayBeforeDialog"
        >
          Click here.</span
        >
      </div>
      <div v-show="after24hours" class="navbar-alert">
        {{ paymentalert }}
        <span
          class="open-dialog"
          @click="kindlyPayAfterDialog = !kindlyPayAfterDialog"
        >
          Click here.</span
        >
      </div>
      <v-container :style="{ padding: cataloguescreen }">
        <nuxt />
      </v-container>
    </v-content>
    <banner-install
      v-show="addtohomescreen === 'newshop'"
      :style="{ display: hiddenbanner }"
      class="banner-install"
    ></banner-install>
    <v-footer v-show="bottombar" color="white" padless :fixed="fixed" app>
      <v-bottom-navigation v-model="bottomNav" grow>
        <v-btn value="inventory" @click="openInventory">
          <span>Categories</span>
          <v-icon>mdi-package-variant-closed</v-icon>
        </v-btn>

        <v-btn value="add" @click="sheet = true">
          <span>Add</span>
          <v-icon>add</v-icon>
        </v-btn>

        <v-btn value="catalogue" to="/catalogue">
          <span>Catalogue</span>
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
    <!-- bottom sheets -->
    <!-- add stuff bottom sheet -->
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="addOptionClicked(tile.title)"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <v-icon>{{ tile.icon }}</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <!-- share category bottom sheet -->
    <v-bottom-sheet v-model="shareCategoryBottomSheet">
      <v-list rounded>
        <v-subheader>Share category on:</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in shares"
            :key="i"
            @click="shareCategoryOn(item.title)"
          >
            <v-list-item-icon>
              <v-icon
                :color="
                  `${item.icon === 'mdi-whatsapp' ? '#25D366' : '#3a5a97'}`
                "
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-bottom-sheet>
    <!-- share subcategory -->
    <v-bottom-sheet v-model="shareSubcategoryBottomSheet">
      <v-list rounded>
        <v-subheader>Share subcategory on:</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in shares"
            :key="i"
            @click="shareSubcategoryOn(item.title)"
          >
            <v-list-item-icon>
              <v-icon
                :color="
                  `${item.icon === 'mdi-whatsapp' ? '#25D366' : '#3a5a97'}`
                "
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-bottom-sheet>
    <!-- share product -->
    <v-bottom-sheet v-model="shareProductBottomSheet">
      <v-list rounded>
        <v-subheader>Share this item on:</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in shares"
            :key="i"
            @click="shareProductOn(item.title)"
          >
            <v-list-item-icon>
              <v-icon
                :color="
                  `${item.icon === 'mdi-whatsapp' ? '#25D366' : '#3a5a97'}`
                "
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-bottom-sheet>
    <!-- dialogs -->
    <!-- add category dialog -->
    <v-dialog v-model="addCategoryDialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Add a category</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="category"
            label="Category"
            prepend-icon="create"
          ></v-text-field>

          <v-alert
            style="font-size: smaller;text-align: center;"
            :value="alert"
            dark
            transition="scale-transition"
            dense
            outlined
            color="red"
          >
            {{ alerttext }}
          </v-alert>

          <v-alert
            :value="alertsuccess"
            transition="scale-transition"
            style="font-size: small;"
            type="success"
          >
            Category added successfully
          </v-alert>

          <v-btn
            :loading="loading2"
            block
            rounded
            color="#92302F"
            dark
            @click="addNewCategory"
            >add</v-btn
          >
          <v-btn
            style="margin-top:10px;font-weight:700;text-transform:none;"
            color="primary"
            rounded
            text
            depressed
            block
            large
            @click="addCategoryDialog = !addCategoryDialog"
            >Cancel</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- edit category dialog -->
    <v-dialog v-model="editCategoryDialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Edit category</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="category"
            label="category"
            prepend-icon="create"
          ></v-text-field>

          <v-alert
            style="font-size: smaller;text-align: center;"
            :value="alert2"
            dark
            transition="scale-transition"
            dense
            outlined
            color="red"
          >
            {{ alerttext }}
          </v-alert>

          <v-alert
            :value="alertsuccess2"
            transition="scale-transition"
            style="font-size: small;"
            type="success"
          >
            Category updated successfully
          </v-alert>

          <v-btn
            :loading="loading2"
            block
            rounded
            color="#92302F"
            dark
            @click="editCategoryName"
            >save</v-btn
          >
          <v-btn
            rounded
            style="margin-top:12px;text-transform:capitalize;"
            color="#92302F"
            text
            block
            @click="openDeleteCategoryDialog"
          >
            <v-icon color="#92302F" left dark>mdi-delete-outline</v-icon>
            Delete
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- add subcategory dialog -->
    <v-dialog v-model="addSubcategoryDialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Add a subcategory</v-card-title>

        <v-card-text>
          <v-select
            v-model="categoryselected"
            :items="categories"
            label="Category"
          ></v-select>
          <v-text-field
            v-model="subcategory"
            label="Subcategory"
            prepend-icon="create"
          ></v-text-field>

          <v-alert
            style="font-size: smaller;text-align: center;"
            :value="alert1"
            dark
            transition="scale-transition"
            dense
            outlined
            color="red"
          >
            {{ alerttext }}
          </v-alert>

          <v-alert
            :value="alertsuccess1"
            transition="scale-transition"
            style="font-size: small;"
            type="success"
          >
            Subcategory added successfully
          </v-alert>

          <v-btn
            :loading="loading2"
            block
            rounded
            color="#92302F"
            dark
            @click="addSubcategory"
            >save</v-btn
          >
          <v-btn
            style="margin-top:10px;font-weight:700;text-transform:none;"
            color="primary"
            rounded
            text
            depressed
            block
            large
            @click="addSubcategoryDialog = !addSubcategoryDialog"
            >Cancel</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- edit subcategory dialog -->
    <v-dialog v-model="editSubcategoryDialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Edit Subcategory</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="subcategory"
            label="Subcategory"
            prepend-icon="create"
          ></v-text-field>

          <v-alert
            style="font-size: smaller;text-align: center;"
            :value="alert3"
            dark
            transition="scale-transition"
            dense
            outlined
            color="red"
          >
            {{ alerttext }}
          </v-alert>

          <v-alert
            :value="alertsuccess3"
            transition="scale-transition"
            style="font-size: small;"
            type="success"
          >
            Subcategory updated successfully
          </v-alert>

          <v-btn
            :loading="loading2"
            block
            rounded
            color="#92302F"
            dark
            @click="editSubcategoryName"
            >save</v-btn
          >
          <v-btn
            rounded
            style="margin-top:12px;text-transform:capitalize;"
            color="#92302F"
            text
            block
            @click="openDeleteSubcategoryDialog"
          >
            <v-icon color="#92302F" left dark>mdi-delete-outline</v-icon>
            Delete
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Delete category dialog -->
    <v-dialog v-model="DeleteCategoryDialog" max-width="350">
      <v-card class="rounded-card">
        <v-card-title class="subtitle-1"
          >Are you sure you want to delete this category?
        </v-card-title>
        <!-- Deleting a category will delete all the products within
          it. -->
        <v-card-text>
          <v-alert
            :value="alertsuccess4"
            transition="scale-transition"
            style="font-size: small;"
            type="success"
          >
            Category deleted successfully
          </v-alert>
          <div>
            <v-btn
              :loading="loading2"
              style="margin-top:10px;font-weight:700;text-transform:none;"
              color="primary"
              outlined
              rounded
              depressed
              block
              @click="deleteCategoryForSure"
              >Yes, delete category</v-btn
            >
            <v-btn
              color="primary"
              block
              rounded
              style="margin-top:20px;text-transform:capitalize;font-weight:700;"
              @click="DeleteCategoryDialog = !DeleteCategoryDialog"
            >
              Cancel</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Delete subcategory dialog -->
    <v-dialog v-model="DeleteSubcategoryDialog" max-width="350">
      <v-card class="rounded-card">
        <v-card-title class="subtitle-1"
          >Are you sure you want to delete this subcategory?
        </v-card-title>
        <!-- Deleting a subcategory will delete all the products
          within it. -->
        <v-card-text>
          <v-alert
            :value="alertsuccess5"
            transition="scale-transition"
            style="font-size: small;"
            type="success"
          >
            Subcategory deleted successfully
          </v-alert>
          <div>
            <v-btn
              :loading="loading2"
              style="margin-top:10px;font-weight:700;text-transform:none;"
              color="primary"
              rounded
              outlined
              depressed
              block
              @click="deleteSubcategoryForSure"
              >Yes, delete subcategory</v-btn
            >
            <v-btn
              color="primary"
              block
              rounded
              style="margin-top:20px;text-transform:capitalize;font-weight:700;"
              @click="DeleteSubcategoryDialog = !DeleteSubcategoryDialog"
            >
              Cancel</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Edit Account Details dialog -->
    <v-dialog v-model="editAccountDialog" max-width="350">
      <v-card class="rounded-card">
        <v-card-title class="subtitle-1">Edit Account Details </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="phonenumber"
            label="Whatsapp number"
            type="number"
            prepend-icon="mdi-whatsapp"
          ></v-text-field>
          <v-text-field
            v-model="shopname"
            label="Shop name"
            prepend-icon="create"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email address"
            prepend-icon="email"
          ></v-text-field>
          <v-alert
            :value="alertsuccess6"
            transition="scale-transition"
            style="font-size: small;"
            type="success"
          >
            Account details updated successfully
          </v-alert>
          <div>
            <v-btn
              :loading="loading2"
              style="margin-top:10px;font-weight:700;text-transform:none;"
              color="primary"
              rounded
              depressed
              block
              large
              @click="updateAccount"
              >Save</v-btn
            >
            <v-btn
              style="margin-top:10px;font-weight:700;text-transform:none;"
              color="primary"
              rounded
              text
              depressed
              block
              large
              @click="editAccountDialog = !editAccountDialog"
              >Cancel</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Request Custom Domain dialog -->
    <v-dialog v-model="customDomainDialog" max-width="350">
      <v-card class="rounded-card">
        <v-card-title class="subtitle-1">Request Custom Domain</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="customdomain"
              :rules="customdomainRules"
              label="Enter the name of your custom domain"
              hint="e.g www.windsordesigns.com"
              prepend-icon="mdi-web"
            ></v-text-field>
            <v-alert
              :value="alertsuccess7"
              transition="scale-transition"
              style="font-size: small;"
              type="success"
              outlined
            >
              Custom domain submitted successfully. We will get back to you
              shortly.
            </v-alert>
            <div>
              <v-btn
                :loading="loading"
                style="margin-top:40px;font-weight:700;text-transform:none;"
                color="primary"
                rounded
                depressed
                block
                large
                @click="submitCustomDomain"
                >Submit</v-btn
              >
              <v-btn
                style="margin-top:10px;font-weight:700;text-transform:none;"
                color="primary"
                rounded
                text
                depressed
                block
                large
                @click="customDomainDialog = !customDomainDialog"
                >Cancel</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <input
      ref="opengallery"
      style="display: none;"
      type="file"
      accept="image/*"
      @change="setImage($event)"
    />
    <!-- Crop Logo dialog -->
    <v-dialog v-model="cropLogoDialog" fullscreen>
      <v-card class="rounded-card">
        <v-card-text
          style="padding-top:70px;padding-right:0px;padding-left:0px;"
        >
          <div id="crop-title" class="subtitle-1">
            Drag to position your logo
          </div>
          <vue-cropper
            ref="cropper"
            :zoomable="true"
            :min-crop-box-width="200"
            :min-crop-box-height="100"
            :src="img"
          ></vue-cropper>
          <div style="color:black;margin-left:8px;" class="subtitle-2">
            * Select logo with white background
          </div>
          <div style="padding-left: 30px;padding-right:30px;margin-top: 90px;">
            <v-alert
              :value="alertsuccess8"
              style="width:95%;margin: auto;margin-top:12px;"
              dense
              type="success"
            >
              <strong>Logo uploaded successfully.</strong>
            </v-alert>
            <v-btn
              :loading="loading"
              style="margin-top:40px;font-weight:700;text-transform:none;"
              color="primary"
              rounded
              depressed
              block
              large
              @click="uploadLogo"
              >Done</v-btn
            >
            <v-btn
              :disabled="loading"
              style="margin-top:10px;font-weight:700;text-transform:none;"
              color="primary"
              text
              rounded
              depressed
              block
              large
              @click="cropLogoDialog = !cropLogoDialog"
              >Cancel</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- kindly pay before dialog -->
    <v-dialog v-model="kindlyPayBeforeDialog" width="380">
      <v-card>
        <v-card-title
          style="display:block;text-align: center;font-size: inherit;"
          >Like what you see?</v-card-title
        >
        <v-card-text style="text-align: center;">
          <div>
            <div>
              Kindly pay your monthly subscription fee <br />
              to continue using E-merse. <br /><br />
              Your catalogue will be deactivated in 24 hours if payment isn't
              made. <br /><br />
              Your support is greatly appreciated.<br /><br />
            </div>
            <v-btn
              style="text-transform:none;"
              rounded
              block
              color="primary"
              @click="openPaymentDialog"
              >Pay Monthly Subscription</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- kindly pay after dialog -->
    <v-dialog v-model="kindlyPayAfterDialog" width="380">
      <v-card>
        <v-card-title
          style="display:block;text-align: center;font-size: inherit;"
          >Want to keep using E-merse?</v-card-title
        >
        <v-card-text style="text-align: center;">
          <div>
            <div>
              Kindly pay your monthly subscription. <br /><br />
              Your support is greatly appreciated. <br /><br />
            </div>
            <v-btn
              style="text-transform:none;"
              rounded
              block
              color="primary"
              @click="openPaymentDialog"
              >Pay Monthly Subscription</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- select payment plan -->
    <v-dialog v-model="paymentPlanDialog" width="380">
      <v-card>
        <v-card-title
          style="display:block;text-align: center;font-size: inherit;"
          >Kindly pay to continue using <br />
          E-merse</v-card-title
        >
        <v-card-text style="text-align: center;">
          <div>
            <div>
              <v-radio-group v-model="radioPlan">
                <v-radio
                  color="primary"
                  :label="plan1"
                  :value="plan1"
                  :disabled="disabledplan1"
                ></v-radio>
                <v-radio
                  color="primary"
                  :label="plan2"
                  :value="plan2"
                  :disabled="disabledplan2"
                ></v-radio>
                <v-radio
                  color="primary"
                  :label="plan3"
                  :value="plan3"
                  :disabled="disabledplan3"
                ></v-radio>
              </v-radio-group>
            </div>
            <div style="margin-bottom: 12px;">
              Bills will be issued on a recurring basis
            </div>
            <!-- <v-btn block color="primary" @click="setUpFlutterwave">next</v-btn> -->
            <v-btn
              style="text-transform:none;"
              rounded
              block
              color="primary"
              @click="setUpFlutterwave"
              >Make Payment</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="limitExceededDialog" width="380">
      <v-card>
        <v-card-title
          style="display:block;text-align: center;font-size: inherit;"
          >You've exceeded your product limit by <br />
          {{ limitexceededby }} products.</v-card-title
        >
        <v-card-text style="text-align: center;">
          <div>
            <div style="font-weight:700;text-align: center;" class="title">
              Kindly upgrade your plan to proceed.
            </div>
            <div>
              <v-radio-group v-model="radioPlan">
                <v-radio
                  color="primary"
                  :label="plan1"
                  :value="plan1"
                  :disabled="disabledplan1"
                ></v-radio>
                <v-radio
                  color="primary"
                  :label="plan2"
                  :value="plan2"
                  :disabled="disabledplan2"
                ></v-radio>
                <v-radio
                  color="primary"
                  :label="plan3"
                  :value="plan3"
                  :disabled="disabledplan3"
                ></v-radio>
              </v-radio-group>
            </div>
            <div style="margin-bottom: 12px;">
              Bills will be issued on a recurring basis
            </div>
            <!-- <v-btn block color="primary" @click="setUpFlutterwave">next</v-btn> -->
            <v-btn
              style="text-transform:none;"
              rounded
              block
              color="primary"
              @click="setUpFlutterwave"
              >Make Payment</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- cancel subscription dialog -->
    <v-dialog v-model="cancelSubscriptionDialog" width="350">
      <v-card>
        <v-card-title
          style="display:block;text-align: center;font-size: inherit;"
          >Goodbyes aren't forever</v-card-title
        >
        <v-card-text style="text-align: center;">
          <div>
            We are sorry to see you leave. Please let us know what the issue
            was:
          </div>
          <div>
            <v-radio-group v-model="radioReason">
              <v-radio
                v-for="(reason, index) in reasons"
                :key="index"
                color="primary"
                :label="reason"
                :value="reason"
              ></v-radio>
            </v-radio-group>
          </div>
          <v-btn
            style="text-transform:none;"
            rounded
            block
            color="primary"
            @click="cancelSubscription"
            >Cancel Subscription</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- snackbar -->
    <v-snackbar v-model="snackbar">
      {{ snackbartext }}
    </v-snackbar>
    <!-- show loading overlay -->
    <v-overlay :value="overlay" light>
      <v-progress-circular
        :size="50"
        :width="7"
        indeterminate
        color="white"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { db, auth, storage } from '~/plugins/firebase'
import BannerInstall from '~/components/BannerInstall'
export default {
  components: {
    BannerInstall
  },
  data() {
    return {
      img: '',
      canvascolor: '',
      myBanner: {},
      myLogo: {},
      loader: null,
      loader2: null,
      loading: false,
      loading2: false,
      overlay: false,
      fixed: true,
      bottomNav: 'categories',
      leftDrawer: false,
      valid: true,
      customdomain: '',
      customdomainRules: [
        v => {
          return !!v || 'Custom domain is required'
        }
      ],
      draweritems: [
        { title: 'Edit Account Details', icon: 'mdi-account-circle-outline' },
        // { title: 'Use a Custom Domain', icon: 'mdi-web' },
        // { title: 'Pay Monthly Subscription', icon: 'mdi-credit-card-plus' },
        { title: 'Cancel Subscription', icon: 'mdi-credit-card-off' },
        { title: 'Log out', icon: 'mdi-logout' }
      ],
      sheet: false,
      tiles: [
        { icon: 'mdi-tag-outline', title: 'Product' },
        { icon: 'mdi-folder-outline', title: 'Category' },
        { icon: 'mdi-folder-multiple-outline', title: 'Subcategory' },
        { icon: 'mdi-image-outline', title: 'Upload/Change your Logo' },
        { icon: 'mdi-image-outline', title: 'Upload/Change your Banner' }
      ],
      shares: [
        { icon: 'mdi-whatsapp', title: 'WhatsApp' },
        { icon: 'mdi-facebook-box', title: 'Facebook' }
      ],
      cropLogoDialog: false,
      cropBannerDialog: false,
      editAccountDialog: false,
      customDomainDialog: false,
      DeleteSubcategoryDialog: false,
      DeleteCategoryDialog: false,
      addCategoryDialog: false,
      editCategoryDialog: false,
      deleteCategoryDialog: false,
      addSubcategoryDialog: false,
      editSubcategoryDialog: false,
      deleteSubcategoryDialog: false,
      cancelSubscriptionDialog: false,
      shareCategoryBottomSheet: false,
      shareSubcategoryBottomSheet: false,
      shareProductBottomSheet: false,
      snackbartext: '',
      snackbar: false,
      category: '',
      oldcategoryname: '',
      oldsubcategoryname: '',
      categoryselected: '',
      alert: false,
      alertsuccess: false,
      alert1: false,
      alertsuccess1: false,
      alert2: false,
      alertsuccess2: false,
      alert3: false,
      alertsuccess3: false,
      alertsuccess4: false,
      alertsuccess5: false,
      alertsuccess6: false,
      alertsuccess7: false,
      alertsuccess8: false,
      alertsuccess9: false,
      alerttext: '',
      subcategory: '',
      categoryid: '',
      bottombar: false,
      cataloguescreen: '12px',
      hiddenbanner: 'none',
      topbar: false,
      phonenumber: '',
      shopname: '',
      email: '',
      expirydate: '',
      sharecategoryname: '',
      sharesubcategoryname: '',
      shareid: '',
      before24hours: false,
      after24hours: false,
      paymentalert: '',
      kindlyPayBeforeDialog: false,
      kindlyPayAfterDialog: false,
      paymentPlanDialog: false,
      limitExceededDialog: false,
      limitexceededby: 0,
      radioReason: '',
      radioPlan: '',
      reasons: [
        'Buggy app',
        'App was hard to use',
        'App made no difference to my business',
        "App didn't have features I wanted"
      ],
      plans: [
        '1 - 50 products - $8/month',
        '51 - 300 products - $24/month',
        '301 - 1000 products - $48/month'
      ],
      plan1: '1 - 50 products - $8/month',
      plan2: '51 - 300 products - $24/month',
      plan3: '301 - 1000 products - $48/month',
      disabledplan1: false,
      disabledplan2: false,
      disabledplan3: false,
      paymentsuccessful: false,
      paymentplan: ''
    }
  },
  computed: {
    categories() {
      // eslint-disable-next-line prefer-const
      let categoriesarray = []
      this.$store.state.categories.map(item =>
        categoriesarray.push(item.categoryname)
      )
      return categoriesarray
    },
    ...mapState(['authenticated', 'user', 'addtohomescreen'])
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
    loader2() {
      const l = this.loader2
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 15000)

      this.loader2 = null
    },
    $route(to, from) {
      if (to.path === '/catalogue' && from.path === '/onboardingcomplete') {
        const expirydate = new Date(this.$store.state.user.expiry_date)
        const signupdate = new Date(this.$store.state.user.sign_up_date)
        const today = new Date()
        this.setPaymentMessage(today, expirydate, signupdate)
      }
      if (to.path === '/inventory' && from.path === '/login') {
        // set account details
        this.phonenumber = this.$store.state.user.phonenumber
        this.shopname = this.$store.state.user.shopname
        this.email = this.$store.state.user.email
        this.paymentplan = this.$store.state.user.payment_plan
        const expirydate = new Date(this.$store.state.user.expiry_date)
        const signupdate = new Date(this.$store.state.user.sign_up_date)
        const today = new Date()
        this.setPaymentMessage(today, expirydate, signupdate)
      }
      if (to.path === '/catalogue') {
        this.topbar = false
        this.bottombar = true
        this.cataloguescreen = '0px'
      } else if (to.path === '/addtohomescreen') {
        this.topbar = false
        this.bottombar = false
        this.cataloguescreen = '0px'
      } else if (to.path === '/login') {
        this.topbar = false
        this.bottombar = false
        this.cataloguescreen = '0px'
      } else if (to.path === '/') {
        this.topbar = false
        this.bottombar = false
      } else if (to.path === '/inventory') {
        this.topbar = true
        this.bottombar = true
        this.cataloguescreen = '12px'
      } else if (to.path === '/onboarding') {
        this.topbar = false
        this.bottombar = false
        this.cataloguescreen = '12px'
      } else if (to.path === '/onboardingcomplete') {
        this.topbar = false
        this.bottombar = false
        this.cataloguescreen = '0px'
      } else if (to.path === '/selectbanner') {
        this.topbar = false
        this.bottombar = false
        this.cataloguescreen = '0px'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      const expirydate = new Date(this.$store.state.user.expiry_date)
      const signupdate = new Date(this.$store.state.user.sign_up_date)
      const today = new Date()
      this.setPaymentMessage(today, expirydate, signupdate)
      // set account details
      this.phonenumber = this.$store.state.user.phonenumber
      this.shopname = this.$store.state.user.shopname
      this.email = this.$store.state.user.email
      this.paymentplan = this.$store.state.user.payment_plan
      // show banner
      if (this.$store.state.addtohomescreen === 'newshop') {
        this.hiddenbanner = 'block'
      }
    }, 1000)
  },
  created() {
    this.$bus.$on('showpaymentplan', value => {
      // set account details
      this.phonenumber = this.$store.state.user.phonenumber
      this.shopname = this.$store.state.user.shopname
      this.email = this.$store.state.user.email
      this.paymentplan = this.$store.state.user.payment_plan
    })
    this.$bus.$on('showbottomandtop', value => {
      this.topbar = true
      this.bottombar = true
    })
    this.$bus.$on('editCategoryDialog', value => {
      this.editCategoryDialog = true
      this.category = value
      this.oldcategoryname = value
    })
    this.$bus.$on('editSubcategoryDialog', value => {
      this.editSubcategoryDialog = true
      this.subcategory = value
      this.oldsubcategoryname = value
    })
    this.$bus.$on('shareCategory', value => {
      this.sharecategoryname = value
      this.shareCategoryBottomSheet = true
    })
    this.$bus.$on('shareSubcategory', value => {
      this.sharecategoryname = value.category
      this.sharesubcategoryname = value.subcategory
      this.shareSubcategoryBottomSheet = true
    })
    this.$bus.$on('shareProduct', value => {
      this.shareid = value.id
      this.shareProductBottomSheet = true
    })
  },
  methods: {
    cancelSubscription() {
      this.cancelSubscriptionDialog = false
      this.snackbartext = 'Subscription cancelled successfully'
      this.snackbar = true
      const user = this.$store.state.user
      user.reason = this.radioReason
      return db.ref('pwa/cancelledsubscriptions').push({ user })
    },
    setPaymentMessage(today, expirydate, signupdate) {
      const hours = this.date_signup_diff_hours(signupdate, today)
      const hours2 = this.date_expiry_diff_hours(expirydate, today)
      console.log(hours2)
      // Before 24 hours
      if (hours <= 24 && expirydate > today && hours2 <= 24) {
        // show payment snackbar at the top
        this.paymentalert = 'Your catalogue will be deactivated in 24hrs.'
        this.before24hours = true
      } else if (hours > 24 && expirydate < today) {
        // after 24 hours
        this.paymentalert = 'Your catalogue is deactivated. To activate,'
        this.after24hours = true
      }
    },
    date_signup_diff_hours(dt2, dt1) {
      let diff = (dt2.getTime() - dt1.getTime()) / 1000
      diff /= 60 * 60
      return Math.abs(Math.round(diff))
    },
    date_expiry_diff_hours(dt2, dt1) {
      let diff = (dt2.getTime() - dt1.getTime()) / 1000
      diff /= 60 * 60
      return Math.abs(Math.round(diff))
    },
    openPaymentDialog() {
      this.kindlyPayBeforeDialog = false
      this.kindlyPayAfterDialog = false
      // get payment plan open dialog
      this.setpaymentplan()
      this.paymentPlanDialog = true
    },
    setpaymentplan() {
      const products = this.$store.state.products
      if (products.length > 1 && products.length < 51) {
        this.radioPlan = '1 - 50 products - $8/month'
        this.disabledplan2 = true
        this.disabledplan3 = true
      } else if (products.length >= 51 && products.length < 300) {
        this.radioPlan = '51 - 300 products - $24/month'
        this.disabledplan1 = true
        this.disabledplan3 = true
      } else if (products.length > 301) {
        this.radioPlan = '301 - 2000 products - $48/month'
        this.disabledplan2 = true
        this.disabledplan1 = true
      }
    },
    setUpFlutterwave() {
      if (this.radioPlan.length < 1) {
        this.text = 'Please select a payment plan'
        this.snackbar = true
      } else {
        switch (this.radioPlan) {
          case '1 - 50 products - $8/month':
            this.openFlutterwave(8)
            break
          case '51 - 300 products - $24/month':
            this.openFlutterwave(24)
            break
          case '301 - 2000 products - $48/month':
            this.openFlutterwave(48)
            break
          default:
            break
        }
      }
    },
    openFlutterwave(amount) {
      this.kindlyPayBeforeDialog = false
      this.kindlyPayAfterDialog = false
      this.paymentPlanDialog = false
      const APIpublicKey = 'FLWPUBK-a8b16c0c6eb5a608387f36e733325495-X'
      const randomnumber = Math.floor(Math.random() * 100000) + 1
      // get customer shop data
      const shopid = this.$store.state.user.shopid
      const email = this.$store.state.user.email
      const phonenumber = this.$store.state.user.phonenumber
      const uid = this.$store.state.user.uid
      const genTxref = `${shopid}&${randomnumber}`
      // eslint-disable-next-line no-undef
      const x = getpaidSetup({
        PBFPubKey: APIpublicKey,
        custom_title: this.radioPlan,
        customer_email: email,
        amount: amount,
        customer_phone: phonenumber,
        currency: 'USD',
        txref: genTxref,
        payment_options: 'card',
        payment_plan: 6897,
        meta: [
          {
            metaname: 'UID',
            metavalue: uid
          }
        ],
        onclose: function() {
          this.showCloseNotification()
        }.bind(this),
        callback: function(response) {
          const txref = response.tx.txRef
          console.log(
            'This is the response returned after a charge',
            txref,
            response
          )
          if (
            response.tx.chargeResponseCode === '00' ||
            response.tx.chargeResponseCode === '0'
          ) {
            // redirect to a success page
            this.paymentsuccessful = true
            this.before24hours = false
            this.after24hours = false
            this.$router.push('/paymentsuccessful')
            // this.paymentsuccessful = true
            // this.showPaymentSuccessfulNotification()
          } else {
            // redirect to a failure page.
            this.$router.push('/paymentfailed')
            // this.paymentsuccessful = false
            // this.showPaymentFailureNotification()
          }

          x.close() // use this to close the modal immediately after payment.
        }.bind(this)
      })
    },
    showCloseNotification() {
      if (this.paymentsuccessful === false) {
        this.$router.push('/paymentfailed')
      }
    },
    shareCategoryOn(title) {
      if (title === 'WhatsApp') {
        this.shareCategoryDialog()
      } else {
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' +
            `https://shop.e-merse.com/?${this.$store.state.user.shopid}&category=${this.sharecategoryname}`,
          'facebook-popup',
          'height=350,width=600'
        )
      }
    },
    shareCategoryDialog() {
      // check if share API is supported or not
      if (this.$vuetify.breakpoint.mdAndUp) {
        window.open(
          `https://wa.me/?text=Have a look! https://shop.e-merse.com/?${this.$store.state.user.shopid}&category=${this.sharecategoryname}`,
          '_blank'
        )
      } else if (
        !this.$vuetify.breakpoint.mdAndUp &&
        navigator.share !== undefined
      ) {
        // web share API
        navigator
          .share({
            // pick the default title of your page in the title tag
            title: this.sharename,
            // change the text of your share as you may like; to e.g desc of your pwa
            text: '',
            url: `https://shop.e-merse.com/?${this.$store.state.user.shopid}&category=${this.sharecategoryname}`
          })
          .then(() => {
            // eslint-disable-next-line no-console
            console.info('PWA Fire Demo shared successfully!')
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Wooooooo! Some magic failed in sharing:', error)
          })
      }
    },
    shareSubcategoryOn(title) {
      if (title === 'WhatsApp') {
        this.shareSubcategoryDialog()
      } else {
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' +
            `https://shop.e-merse.com/?${this.$store.state.user.shopid}&category=${this.sharecategoryname}&subcategory=${this.sharesubcategoryname}`,
          'facebook-popup',
          'height=350,width=600'
        )
      }
    },
    shareSubcategoryDialog() {
      // check if share API is supported or not
      // eslint-disable-next-line no-console
      if (this.$vuetify.breakpoint.mdAndUp) {
        window.open(
          `https://wa.me/?text=Have a look! https://shop.e-merse.com/?${this.$store.state.user.shopid}&category=${this.sharecategoryname}&subcategory=${this.sharesubcategoryname}`,
          '_blank'
        )
      } else if (
        !this.$vuetify.breakpoint.mdAndUp &&
        navigator.share !== undefined
      ) {
        // web share API
        navigator
          .share({
            // pick the default title of your page in the title tag
            title: this.sharename,
            // change the text of your share as you may like; to e.g desc of your pwa
            text: '',
            url: `https://shop.e-merse.com/?${this.$store.state.user.shopid}&category=${this.sharecategoryname}&subcategory=${this.sharesubcategoryname}`
          })
          .then(() => {
            // eslint-disable-next-line no-console
            console.info('PWA Fire Demo shared successfully!')
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Wooooooo! Some magic failed in sharing:', error)
          })
      }
    },
    shareProductOn(title) {
      if (title === 'WhatsApp') {
        this.shareProductDialog()
      } else {
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' +
            `https://e-merse.com/viewlink?text=${this.shareid}`,
          'facebook-popup',
          'height=350,width=600'
        )
      }
    },
    shareProductDialog() {
      // check if share API is supported or not
      // eslint-disable-next-line no-console
      if (this.$vuetify.breakpoint.mdAndUp) {
        window.open(
          `https://wa.me/?text=Check this out! https://e-merse.com/viewlink?text=${this.shareid}`,
          '_blank'
        )
      } else if (
        !this.$vuetify.breakpoint.mdAndUp &&
        navigator.share !== undefined
      ) {
        // web share API
        navigator
          .share({
            // pick the default title of your page in the title tag
            title: this.sharename,
            // change the text of your share as you may like; to e.g desc of your pwa
            text: '',
            url: `https://e-merse.com/viewlink?text=${this.shareid}`
          })
          .then(() => {
            // eslint-disable-next-line no-console
            console.info('PWA Fire Demo shared successfully!')
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Wooooooo! Some magic failed in sharing:', error)
          })
      }
    },
    uploadLogo() {
      this.loader = 'loading'
      this.$refs.cropper
        .getCroppedCanvas({
          width: 200,
          height: 100
        })
        .toBlob(blob => {
          console.log(blob)
          this.uploadLogoAsPromise(blob)
        })
      // if (!this.myLogo.hasImage()) {
      //   alert('No image to upload')
      // } else {
      //   this.myLogo.generateBlob(
      //     blob => {
      //       this.uploadLogoAsPromise(blob)
      //     },
      //     'image/jpeg',
      //     0.8
      //   )
      // }
    },
    myLogoFile() {
      this.canvascolor = 'white'
    },
    myLogoFileRemove() {
      this.canvascolor = ''
    },
    // Handle waiting to upload each file using promise
    uploadLogoAsPromise(imageFile) {
      return new Promise((resolve, reject) => {
        const randomnumber = Math.floor(Math.random() * 100000) + 1
        const name = `image-${randomnumber}`
        const uploadTask = storage.ref(`/pwa/${name}`).put(imageFile)
        uploadTask.on(
          'state_changed',
          function(snapshot) {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          },
          function(error) {
            console.log(error)
          },
          function() {
            storage
              .ref(`/pwa/${name}`)
              .getDownloadURL()
              .then(downloadURL => {
                if (downloadURL) {
                  console.log(downloadURL)
                  this.addLogoToDB(downloadURL)
                }
              })
          }.bind(this)
        )
        resolve()
      })
    },
    addLogoToDB(url) {
      return db
        .ref(`pwa/products/logo-${this.$store.state.user.shopid}`)
        .set({
          logo: url,
          shopid: this.$store.state.user.shopid
        })
        .then(snap => {
          this.alertsuccess8 = true
          setTimeout(() => {
            this.alertsuccess8 = false
            this.myLogo = {}
          }, 4000)
        })
    },
    submitCustomDomain() {
      if (this.$refs.form.validate()) {
        this.loader = 'loading'
        return db
          .ref(`pwa/customdomainrequests`)
          .push({
            email: this.email,
            phonenumber: this.phonenumber,
            shopname: this.shopname,
            customdomain: this.customdomain
          })
          .then(snap => {
            this.alertsuccess7 = true
            setTimeout(() => {
              this.customDomainDialog = false
            }, 4000)
          })
      }
    },
    openInventory() {
      this.overlay = true
      this.$router.push('/inventory')
      setTimeout(() => {
        this.overlay = false
      }, 1300)
    },
    updateAccount() {
      this.loader2 = 'loading2'
      const shopName = this.shopname
        .trim()
        .replace(
          // eslint-disable-next-line no-useless-escape
          /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        )
        .toLowerCase()
      const shopId = shopName.replace(/ /g, '-').toLowerCase()
      return db
        .ref(`pwa/users/${this.$store.state.user.id}`)
        .update({
          email: this.email,
          phonenumber: this.phonenumber,
          shopname: shopName,
          shopid: shopId
        })
        .then(snap => {
          const shop = {
            shopid: shopId,
            shopname: shopName,
            email: this.email,
            phonenumber: this.phonenumber
          }
          // change name in store
          this.$store.commit('changeShopName', shop)
          if (this.shopname !== this.$store.state.user.shopname) {
            this.updateAllProducts(shopId, shopName)
          } else {
            this.alertsuccess6 = true
            setTimeout(() => {
              window.location.href = 'https://myshop.e-merse.com/inventory'
            }, 1800)
          }
        })
    },
    updateAllProducts(shopId, shopName) {
      // eslint-disable-next-line prefer-const
      let productstobeupdated = []
      this.$store.state.products.map(el => {
        el.shopname = shopName
        el.shopid = shopId
        productstobeupdated.push(el)
      })
      this.$store.state.categories.map(el => {
        el.shopid = shopId
        el.shopname = shopName
        productstobeupdated.push(el)
      })
      if (productstobeupdated.length > 0) {
        productstobeupdated.map(this.updateProductsToDB7)
      } else {
        this.alertsuccess6 = true
        setTimeout(() => {
          window.location.href = 'https://myshop.e-merse.com/inventory'
        }, 1800)
      }
    },
    updateProductsToDB7(product) {
      return db
        .ref(`pwa/products/${product.id}`)
        .update({
          shopid: product.shopid,
          shopname: product.shopname
        })
        .then(snap => {
          // eslint-disable-next-line no-console
          console.log('updated')
          this.alertsuccess6 = true
          setTimeout(() => {
            window.location.href = 'https://myshop.e-merse.com/inventory'
          }, 1800)
        })
    },
    addNewCategory() {
      const categoryName = this.category.trim().replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      )
      // check if there is a category with the same name
      if (
        this.$store.state.categories.some(
          el => el.categoryname === categoryName
        )
      ) {
        // show snackbar
        this.alerttext = 'A category with that name already exists'
        this.alert = !this.alert
      } else {
        this.loader2 = 'loading2'
        this.alert = false
        this.addNewCategoryToDB(categoryName)
      }
    },
    addNewCategoryToDB(categoryName) {
      const category = {
        date_created: new Date().toString(),
        categoryname: categoryName,
        subcategory: [],
        shopid: this.$store.state.user.shopid
      }
      const newPostKey = db
        .ref()
        .child('pwa/products')
        .push().key

      category.id = newPostKey
      const updates = {}
      updates['pwa/products/' + newPostKey] = category

      return db
        .ref()
        .update(updates)
        .then(snap => {
          this.alertsuccess = true
          setTimeout(() => {
            window.location.href = 'https://myshop.e-merse.com/inventory'
          }, 1800)
        })
    },
    editCategoryName() {
      const categoryName = this.category.trim().replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      )
      // check if there is a category with the same name
      if (
        this.$store.state.categories.some(
          el => el.categoryname === categoryName
        )
      ) {
        // show snackbar
        this.alerttext = 'A category with that name already exists'
        this.alert2 = !this.alert2
      } else {
        this.loader2 = 'loading2'
        this.alert2 = false
        const category = this.$store.state.categories.filter(
          el => el.categoryname === this.oldcategoryname
        )
        this.editCategoryNameToDB(categoryName, category[0].id)
      }
    },
    editCategoryNameToDB(categoryName, categoryid) {
      return db
        .ref(`pwa/products/${categoryid}`)
        .update({
          categoryname: categoryName
        })
        .then(snap => {
          this.editAllProductsCategory(categoryName)
        })
    },
    editAllProductsCategory(newcategoryname) {
      const productstobechanged = []
      this.$store.state.products.map(el => {
        if (el.category.includes(this.oldcategoryname)) {
          const index = el.category.findIndex(
            name => name === this.oldcategoryname
          )
          el.category.splice(index, 1, newcategoryname)
          productstobechanged.push(el)
        }
      })
      if (productstobechanged.length > 0) {
        productstobechanged.map(this.updateProductsToDB)
      } else {
        this.alertsuccess2 = true
        setTimeout(() => {
          window.location.href = 'https://myshop.e-merse.com/inventory'
        }, 1800)
      }
    },
    updateProductsToDB(product) {
      return db
        .ref(`pwa/products/${product.id}`)
        .update({
          category: product.category
        })
        .then(snap => {
          this.alertsuccess2 = true
          setTimeout(() => {
            window.location.href = 'https://myshop.e-merse.com/inventory'
          }, 1800)
        })
    },
    addSubcategory() {
      if (this.categoryselected.length === 0) {
        this.alert1 = false
        this.alerttext = 'Please select a category first'
        this.alert1 = true
      } else if (this.subcategory.length < 1) {
        this.alert1 = false
        this.alerttext = 'Please enter a valid subcategory name'
        this.alert1 = true
      } else if (
        this.categoryselected.length > 1 &&
        this.subcategory.length > 1
      ) {
        this.addNewSubCategory()
      }
    },
    addNewSubCategory() {
      this.alert1 = false
      const subcategoryName = this.subcategory.trim().replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      )
      const category = this.$store.state.categories.filter(
        el => el.categoryname === this.categoryselected
      )
      // check if there is a category with the same name
      if (
        category[0].subcategories &&
        category[0].subcategories.includes(subcategoryName)
      ) {
        this.alerttext = 'A subcategory with that name already exists'
        this.alert1 = !this.alert1
      } else {
        this.loader2 = 'loading2'
        this.alert1 = false
        // eslint-disable-next-line prefer-const
        let subcategories = []
        if (category[0].subcategories) {
          subcategories = category[0].subcategories
          subcategories.push(subcategoryName)
        } else {
          subcategories.push(subcategoryName)
        }
        const categoryid = category[0].id
        this.addNewSubCategoryToDB(subcategories, categoryid)
      }
    },
    addNewSubCategoryToDB(subcategories, categoryid) {
      return db
        .ref(`pwa/products/${categoryid}`)
        .update({ subcategories: subcategories })
        .then(snap => {
          this.alert1 = false
          this.alertsuccess1 = true
          // refresh inventory page
          setTimeout(() => {
            window.location.href = 'https://myshop.e-merse.com/inventory'
          }, 1800)
        })
    },
    editSubcategoryName() {
      const subcategoryName = this.subcategory.trim().replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      )
      const validsubcategories = this.$store.state.categories.filter(
        el => el.subcategories
      )
      // check if there is a category with the same name
      if (
        validsubcategories.some(el =>
          el.subcategories.includes(subcategoryName)
        )
      ) {
        this.alerttext = 'A subcategory with that name already exists'
        this.alert3 = true
      } else {
        this.loader2 = 'loading2'
        this.alert3 = false
        const category = validsubcategories.filter(el =>
          el.subcategories.includes(this.oldsubcategoryname)
        )
        // eslint-disable-next-line prefer-const
        let subcategories = category[0].subcategories
        // get index position by ID
        const index = subcategories.findIndex(
          name => name === this.oldsubcategoryname
        )
        subcategories.splice(index, 1, subcategoryName)
        const categoryid = category[0].id
        this.editSubcategoryNameToDB(subcategories, categoryid, subcategoryName)
      }
    },
    editSubcategoryNameToDB(subcategories, categoryid, subcategoryName) {
      return db
        .ref(`pwa/products/${categoryid}`)
        .update({
          subcategories: subcategories
        })
        .then(snap => {
          this.editAllProductsSubcategory(subcategoryName)
        })
    },
    editAllProductsSubcategory(newsubcategoryname) {
      const productstobechanged = []
      this.$store.state.products.map(el => {
        if (el.subcategory.includes(this.oldsubcategoryname)) {
          const index = el.subcategory.findIndex(
            name => name === this.oldsubcategoryname
          )
          el.subcategory.splice(index, 1, newsubcategoryname)
          productstobechanged.push(el)
        }
      })
      if (productstobechanged.length > 0) {
        productstobechanged.map(this.updateProductsToDB2)
      } else {
        this.alertsuccess3 = true
        setTimeout(() => {
          window.location.href = 'https://myshop.e-merse.com/inventory'
        }, 1800)
      }
    },
    updateProductsToDB2(product) {
      return db
        .ref(`pwa/products/${product.id}`)
        .update({
          subcategory: product.subcategory
        })
        .then(snap => {
          this.alertsuccess3 = true
          setTimeout(() => {
            window.location.href = 'https://myshop.e-merse.com/inventory'
          }, 1800)
        })
    },
    openDeleteCategoryDialog() {
      this.editCategoryDialog = false
      this.DeleteCategoryDialog = true
      const category = this.$store.state.categories.filter(
        el => el.categoryname === this.category
      )
      this.categoryid = category[0].id
    },
    deleteCategoryForSure() {
      this.loader2 = 'loading2'
      return db
        .ref(`pwa/products/${this.categoryid}`)
        .remove()
        .then(snap => {
          this.deleteAllProductsCategory()
        })
    },
    deleteAllProductsCategory() {
      const productstobedeleted = []
      this.$store.state.products.map(el => {
        if (el.category.includes(this.oldcategoryname)) {
          if (Array.isArray(el.category)) {
            const index = el.category.findIndex(
              name => name === this.oldcategoryname
            )
            el.category.splice(index, 1)
            productstobedeleted.push(el)
          } else {
            productstobedeleted.push(el)
          }
        }
      })
      if (productstobedeleted.length > 0) {
        productstobedeleted.map(this.updateProductsToDB3)
      } else {
        this.alertsuccess4 = true
        setTimeout(() => {
          window.location.href = 'https://myshop.e-merse.com/inventory'
        }, 1800)
      }
    },
    updateProductsToDB3(product) {
      return db
        .ref(`pwa/products/${product.id}`)
        .update({
          category: product.category
        })
        .then(snap => {
          this.alertsuccess4 = true
          setTimeout(() => {
            window.location.href = 'https://myshop.e-merse.com/inventory'
          }, 1800)
        })
    },
    openDeleteSubcategoryDialog() {
      this.editSubcategoryDialog = false
      this.DeleteSubcategoryDialog = true
      const validsubcategories = this.$store.state.categories.filter(
        el => el.subcategories
      )
      const category = validsubcategories.filter(el =>
        el.subcategories.includes(this.oldsubcategoryname)
      )
      this.categoryid = category[0].id
      // eslint-disable-next-line prefer-const
      let subcategories = category[0].subcategories
      // get index position by ID
      const index = subcategories.findIndex(
        name => name === this.oldsubcategoryname
      )
      subcategories.splice(index, 1)
      this.subcategorydelete = subcategories
    },
    deleteSubcategoryForSure() {
      this.loader2 = 'loading2'
      return db
        .ref(`pwa/products/${this.categoryid}`)
        .update({
          subcategories: this.subcategorydelete
        })
        .then(snap => {
          this.deleteAllProductsSubcategory()
        })
    },
    deleteAllProductsSubcategory() {
      const productstobedeleted = []
      this.$store.state.products.map(el => {
        if (el.subcategory.includes(this.oldsubcategoryname)) {
          if (Array.isArray(el.subcategory)) {
            const index = el.subcategory.findIndex(
              name => name === this.oldsubcategoryname
            )
            el.subcategory.splice(index, 1)
            productstobedeleted.push(el)
          } else {
            productstobedeleted.push(el)
          }
        }
      })
      if (productstobedeleted.length > 0) {
        productstobedeleted.map(this.updateProductsToDB4)
      } else {
        this.alertsuccess5 = true
        setTimeout(() => {
          window.location.href = 'https://myshop.e-merse.com/inventory'
        }, 1800)
      }
    },
    updateProductsToDB4(product) {
      return db
        .ref(`pwa/products/${product.id}`)
        .update({
          subcategory: product.subcategory
        })
        .then(snap => {
          this.alertsuccess5 = true
          setTimeout(() => {
            window.location.href = 'https://myshop.e-merse.com/inventory'
          }, 1800)
        })
    },
    navDrawerClick(title) {
      this.leftDrawer = false
      switch (title) {
        case 'Edit Account Details':
          this.editAccountDialog = true
          break
        case 'Use a Custom Domain':
          this.customDomainDialog = true
          break
        case 'Pay Monthly Subscription Cancel Subscription':
          // this.addSubcategoryDialog = true
          break
        case 'Cancel Subscription':
          this.cancelSubscriptionDialog = true
          break
        case 'Log out':
          auth.signOut().then(
            () => {
              this.$store.commit('authUser', false)
              this.$store.commit('clearUser', false)
              window.location.href = 'https://myshop.e-merse.com/'
            },
            error => {
              // eslint-disable-next-line no-console
              console.error('Sign Out Error', error)
            }
          )
          break
        default:
          break
      }
    },
    addOptionClicked(title) {
      this.sheet = false
      switch (title) {
        case 'Product':
          // eslint-disable-next-line no-case-declarations
          const totalProducts = this.$store.state.products.length + 1
          // eslint-disable-next-line no-case-declarations
          const paymentPlan = this.$store.state.user.payment_plan
          if (
            paymentPlan === '1 - 50 products - $7.50/month' &&
            totalProducts > 50
          ) {
            this.limitExceededDialog = true
            this.limitexceededby = totalProducts - 50
            this.radioPlan = '51 - 300 products - $24/month'
            this.disabledplan1 = true
            this.disabledplan3 = true
          } else if (
            paymentPlan === '51 - 300 products - $24/month' &&
            totalProducts > 300
          ) {
            this.limitExceededDialog = true
            this.limitexceededby = totalProducts - 50
            this.radioPlan = '51 - 300 products - $24/month'
            this.disabledplan1 = true
            this.disabledplan2 = true
          } else if (this.after24hours === true) {
            this.kindlyPayAfterDialog = true
          } else {
            this.$router.push('/createproduct')
          }
          break
        case 'Category':
          this.addCategoryDialog = true
          break
        case 'Subcategory':
          this.addSubcategoryDialog = true
          break
        case 'Upload/Change your Logo':
          // this.cropLogoDialog = true
          this.$refs.opengallery.click()
          break
        case 'Upload/Change your Banner':
          this.$router.push('/selectbanner')
          break
        default:
          break
      }
    },
    setImage(e) {
      console.log(e)
      if (e) {
        const image = URL.createObjectURL(e.target.files[0])
        this.img = image
        this.cropLogoDialog = true
      }
    }
  }
}
</script>

<style>
.navbar-alert {
  font-weight: 500;
  font-size: 12px;
  width: 100%;
  text-align: center;
  padding: 12px;
  background: #92302f;
  border-radius: 4px;
  color: white;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
}
.open-dialog {
  text-decoration-color: white;
  text-decoration-line: underline;
  cursor: pointer;
}
.tap-upload {
  cursor: pointer;
  width: 250px;
  height: 100px;
  margin: auto;
  border-style: dashed;
  border-color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 100px;
}
.tap-upload p {
  color: white;
}
.croppa-container canvas {
  border-style: dashed;
  border-color: gray;
}
#crop-title {
  font-weight: 700;
  padding: 20px;
  color: black;
  text-align: center;
}
.v-banner--single-line .v-banner__text {
  font-size: 13px;
  margin-left: 1px;
  font-weight: 700;
}
.v-banner--is-mobile.v-banner--single-line .v-banner__actions {
  margin-left: 10px;
  margin-bottom: 6px;
}
.v-banner--is-mobile .v-banner__icon {
  margin-right: 1px;
  height: 30px;
  min-width: 30px;
  width: 30px;
}
.banner-install {
  -webkit-box-shadow: 0px 0px 3px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 3px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 3px rgba(50, 50, 50, 0.75);
  position: fixed !important;
  bottom: 56px !important;
  width: 100% !important;
}
.col-6 {
  padding: 2px !important;
}
.v-application .mb-6 {
  padding: 10px;
}
.v-breadcrumbs li {
  margin-top: 10px !important;
}
.container {
  padding: 12px;
}
.headline {
  text-align: center;
}
.theme--light.v-stepper {
  box-shadow: none !important;
}
.v-stepper__header {
  box-shadow: none !important;
  margin: auto;
  width: 80%;
  position: -webkit-sticky; /* Safari */
  position: sticky;
}
.v-stepper__content {
  padding: 10px 10px 16px !important;
}
.firebaseui-idp-list {
  padding-left: 0px !important;
}
.theme--light.v-breadcrumbs .v-breadcrumbs__divider,
.theme--light.v-breadcrumbs .v-breadcrumbs__item--disabled {
  color: gray !important;
}
.v-breadcrumbs__item {
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  font-size: 20px;
  color: #2196f3 !important;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
