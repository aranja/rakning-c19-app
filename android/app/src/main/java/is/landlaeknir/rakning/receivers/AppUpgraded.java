package is.landlaeknir.rakning.receivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class AppUpgraded extends BroadcastReceiver {
    @Override
    public void onReceive(final Context context, Intent intent) {
        // Restart the app on auto updates
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
        context.startActivity(launchIntent);
    }
}