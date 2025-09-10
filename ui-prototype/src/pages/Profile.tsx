import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Camera, Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  
  // 임시 사용자 데이터 (실제로는 props나 context에서 가져옴)
  const [user, setUser] = useState({
    id: '1',
    name: '개발자',
    email: 'developer@example.com',
    avatar: '',
    bio: '풀스택 개발자입니다.',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
  });

  const handleSave = () => {
    // 여기에 실제 저장 로직을 구현하세요
    setUser(prev => ({
      ...prev,
      name: formData.name,
      bio: formData.bio,
    }));
    
    setIsEditing(false);
    toast({
      title: "프로필 업데이트 완료",
      description: "프로필이 성공적으로 업데이트되었습니다.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio,
    });
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    // 여기에 프로필 이미지 변경 로직을 구현하세요
    toast({
      title: "이미지 업로드",
      description: "프로필 이미지 업로드 기능을 구현해주세요.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">마이페이지</h1>
            <p className="text-muted-foreground">프로필과 설정을 관리하세요</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* 프로필 정보 */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
              <CardDescription>
                공개 프로필 정보를 수정할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 프로필 이미지 */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button onClick={handleAvatarChange} variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    이미지 변경
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG 파일만 업로드 가능합니다 (최대 2MB)
                  </p>
                </div>
              </div>

              <Separator />

              {/* 기본 정보 */}
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    이메일은 변경할 수 없습니다
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">닉네임</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="닉네임을 입력하세요"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">소개</Label>
                  <Input
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="간단한 자기소개를 입력하세요"
                  />
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex justify-end space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      취소
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      저장
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <User className="mr-2 h-4 w-4" />
                    프로필 수정
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 계정 통계 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>활동 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">작성한 글</span>
                  <span className="font-semibold">12개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">받은 좋아요</span>
                  <span className="font-semibold">48개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">작성한 댓글</span>
                  <span className="font-semibold">156개</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>계정 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">가입일</span>
                  <span className="text-sm">2024.01.01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">계정 상태</span>
                  <span className="text-sm text-primary">활성</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;