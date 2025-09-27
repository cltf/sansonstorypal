package com.sansheng.storypal

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView

class ChildHomeActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_child_home)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        // 功能卡片点击事件
        findViewById<CardView>(R.id.cardScan).setOnClickListener {
            startActivity(Intent(this, ChildScanActivity::class.java))
        }
        
        findViewById<CardView>(R.id.cardReading).setOnClickListener {
            startActivity(Intent(this, ChildReadingActivity::class.java))
        }
        
        findViewById<CardView>(R.id.cardTask).setOnClickListener {
            startActivity(Intent(this, ChildRewardsActivity::class.java))
        }
        
        findViewById<CardView>(R.id.cardOffline).setOnClickListener {
            showToast("离线阅读功能开发中...")
        }
        
        // 底部按钮点击事件
        findViewById<Button>(R.id.btnFindParents).setOnClickListener {
            showToast("寻找家长功能开发中...")
        }
        
        findViewById<Button>(R.id.btnEyeProtection).setOnClickListener {
            toggleEyeProtection()
        }
    }
    
    private fun toggleEyeProtection() {
        // TODO: 实现护眼模式切换
        showToast("护眼模式已切换")
    }
    
    private fun showToast(message: String) {
        android.widget.Toast.makeText(this, message, android.widget.Toast.LENGTH_SHORT).show()
    }
}
