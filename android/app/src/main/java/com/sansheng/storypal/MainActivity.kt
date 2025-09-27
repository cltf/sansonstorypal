package com.sansheng.storypal

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        // 儿童端功能按钮
        findViewById<Button>(R.id.btnChildHome).setOnClickListener {
            startActivity(Intent(this, ChildHomeActivity::class.java))
        }
        
        findViewById<Button>(R.id.btnChildScan).setOnClickListener {
            startActivity(Intent(this, ChildScanActivity::class.java))
        }
        
        findViewById<Button>(R.id.btnChildReading).setOnClickListener {
            startActivity(Intent(this, ChildReadingActivity::class.java))
        }
        
        findViewById<Button>(R.id.btnChildRewards).setOnClickListener {
            startActivity(Intent(this, ChildRewardsActivity::class.java))
        }
        
        // 家长端功能按钮
        findViewById<Button>(R.id.btnParentDashboard).setOnClickListener {
            startActivity(Intent(this, ParentDashboardActivity::class.java))
        }
        
        // 设备功能按钮
        findViewById<Button>(R.id.btnDeviceConnect).setOnClickListener {
            // TODO: 实现设备连接功能
            showToast("设备连接功能开发中...")
        }
        
        findViewById<Button>(R.id.btnProjectorMode).setOnClickListener {
            // TODO: 实现投影模式功能
            showToast("投影模式功能开发中...")
        }
    }
    
    private fun showToast(message: String) {
        android.widget.Toast.makeText(this, message, android.widget.Toast.LENGTH_SHORT).show()
    }
}
