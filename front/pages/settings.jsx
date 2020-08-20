import AppLayout from "../components/AppLayout";
import Settings from "../components/Settings";
import SettingTabs from "../components/SettingTabs";

const settings = () => {
  return (
    <AppLayout>
      <SettingTabs>
        <Settings>
          <div>abc</div>
        </Settings>
      </SettingTabs>
    </AppLayout>
  );
};

export default settings;
