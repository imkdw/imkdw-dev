import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Heart, MessageCircle, User, Check, Trash2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  avatar?: string;
}

const Notifications = () => {
  const { toast } = useToast();
  
  // 더 많은 임시 알림 데이터
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: '새로운 좋아요',
      message: '김개발님이 "React Hook 완전정복" 글에 좋아요를 눌렀습니다.',
      time: '5분 전',
      isRead: false,
    },
    {
      id: '2',
      type: 'comment',
      title: '새로운 댓글',
      message: '이자바님이 "TypeScript 마스터하기"에 댓글을 달았습니다: "정말 유용한 정보네요! 감사합니다."',
      time: '1시간 전',
      isRead: false,
    },
    {
      id: '3',
      type: 'follow',
      title: '새로운 팔로워',
      message: '박프론트님이 회원님을 팔로우하기 시작했습니다.',
      time: '3시간 전',
      isRead: true,
    },
    {
      id: '4',
      type: 'like',
      title: '새로운 좋아요',
      message: '최리액트님이 "Next.js 14 새 기능" 글에 좋아요를 눌렀습니다.',
      time: '5시간 전',
      isRead: false,
    },
    {
      id: '5',
      type: 'comment',
      title: '새로운 댓글',
      message: '정웹개발님이 "CSS Grid vs Flexbox"에 댓글을 달았습니다.',
      time: '8시간 전',
      isRead: true,
    },
    {
      id: '6',
      type: 'system',
      title: '시스템 알림',
      message: '새로운 기능이 업데이트되었습니다. 다크모드 개선과 새로운 에디터 기능을 확인해보세요!',
      time: '1일 전',
      isRead: true,
    },
    {
      id: '7',
      type: 'follow',
      title: '새로운 팔로워',
      message: '한개발자님이 회원님을 팔로우하기 시작했습니다.',
      time: '2일 전',
      isRead: true,
    },
    {
      id: '8',
      type: 'like',
      title: '좋아요 10개 달성',
      message: '"JavaScript 비동기 처리" 글이 좋아요 10개를 달성했습니다!',
      time: '3일 전',
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <User className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'comment':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'follow':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    
    toast({
      title: "알림 확인",
      description: "모든 알림을 읽음으로 표시했습니다.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    
    toast({
      title: "알림 삭제",
      description: "알림이 삭제되었습니다.",
    });
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
    
    toast({
      title: "알림 정리",
      description: "읽은 알림들이 모두 삭제되었습니다.",
    });
  };

  const renderNotificationList = (notificationList: Notification[]) => {
    if (notificationList.length === 0) {
      return (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">알림이 없습니다</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {notificationList.map((notification) => (
          <Card key={notification.id} className={`${!notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(notification.type)}`}>
                        {notification.type === 'like' && '좋아요'}
                        {notification.type === 'comment' && '댓글'}
                        {notification.type === 'follow' && '팔로우'}
                        {notification.type === 'system' && '시스템'}
                      </Badge>
                      {!notification.isRead && (
                        <Badge variant="destructive" className="text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!notification.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      읽음
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Bell className="h-8 w-8" />
              <span>알림</span>
            </h1>
            <p className="text-muted-foreground">
              모든 알림을 확인하고 관리하세요
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadNotifications.length > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <Check className="h-4 w-4 mr-2" />
                모두 읽음 ({unreadNotifications.length})
              </Button>
            )}
            {readNotifications.length > 0 && (
              <Button onClick={deleteAllRead} variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                읽은 알림 삭제
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">전체 알림</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">읽지 않음</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{unreadNotifications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">읽음</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{readNotifications.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              전체 알림 ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              읽지 않음 ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="read">
              읽음 ({readNotifications.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderNotificationList(notifications)}
          </TabsContent>
          
          <TabsContent value="unread">
            {renderNotificationList(unreadNotifications)}
          </TabsContent>
          
          <TabsContent value="read">
            {renderNotificationList(readNotifications)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;