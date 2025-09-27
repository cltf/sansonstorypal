package com.sansheng.storypal

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class ParentDashboardActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_parent_dashboard)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        findViewById<Button>(R.id.btnReadingProgress).setOnClickListener {
            showToast("阅读进度功能开发中...")
        }
        
        findViewById<Button>(R.id.btnTimeControl).setOnClickListener {
            showToast("时间控制功能开发中...")
        }
        
        findViewById<Button>(R.id.btnRemoteReading).setOnClickListener {
            showToast("远程共读功能开发中...")
        }
        
        findViewById<Button>(R.id.btnDeviceSettings).setOnClickListener {
            showToast("设备设置功能开发中...")
        }
    }
    
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
