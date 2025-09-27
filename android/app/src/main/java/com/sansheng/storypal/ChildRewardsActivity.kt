package com.sansheng.storypal

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class ChildRewardsActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_child_rewards)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        findViewById<Button>(R.id.btnMyAchievements).setOnClickListener {
            showToast("我的成就功能开发中...")
        }
        
        findViewById<Button>(R.id.btnDailyRewards).setOnClickListener {
            showToast("每日奖励功能开发中...")
        }
        
        findViewById<Button>(R.id.btnLevelProgress).setOnClickListener {
            showToast("等级进度功能开发中...")
        }
    }
    
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
